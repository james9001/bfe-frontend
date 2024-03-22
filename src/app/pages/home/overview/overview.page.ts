import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ApplicationSettingsData } from "src/app/service/application-settings-data";
import { ApplicationStateData } from "src/app/service/application-state-data";
import { ConnectionData } from "src/app/service/connection-data";

/*
 * TODO: refactor this module a lot.
 * This is basically prototype-stage
 */
@Component({
	selector: "app-overview",
	templateUrl: "./overview.page.html",
	styleUrls: ["./overview.page.scss"],
})
export class OverviewPage {
	public state: OverviewPageState = {
		allMutableBasicViews: [],
		allImmutableBasicViews: [],
		finishedInit: false,
	};

	constructor(
		private http: HttpClient,
		private connectionData: ConnectionData,
		private applicationStateData: ApplicationStateData,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	public async ionViewWillEnter() {
		void this.populateData();
	}

	public async onClickCategoryCard(view: BasicPreservationCategoryView) {
		view.isOpened = !view.isOpened;
		if (view.isOpened && !view.fullModel) {
			void this.populatePreservationCategory(view);
		}
	}

	public async onClickPreservationTargetCard(
		view: PreservationCategoryPreservationTargetListItemView
	) {
		view.isOpened = !view.isOpened;
	}

	private async populatePreservationCategory(view: BasicPreservationCategoryView): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const fullModel = await this.http
			.get<PreservationCategory>(
				baseUrl +
					"/api/view/category/detail/" +
					(view.isMutable ? "mutable" : "immutable") +
					"/" +
					view.name,
				{}
			)
			.toPromise();

		const applicationState = await this.applicationStateData.getCurrentState();
		const settings = await this.applicationSettingsData.getApplicationSettings();

		view.fullModel = {
			name: fullModel.name,
			isMutable: fullModel.isMutable,
			preservationTargets: fullModel.preservationTargets
				.map((target: PreservationCategoryPreservationTargetListItem) => {
					const uploads = target.mostRecentBackup
						? target.mostRecentBackup.uploads.map((dto) => {
								return {
									...dto,
								};
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: [];
					const successfulUploads = target.mostRecentBackup
						? target.mostRecentBackup.uploads
								.filter((dto) => dto.status === "COMPLETE" && dto.completedTime)
								.map((dto) => {
									return {
										...dto,
									};
								})
						: [];

					let statusLevel = 0;
					let statusText = "OK";

					const desiredCompletedUploadCount = settings.uploadToTwoTargets ? 2 : 1;

					if (target.mostRecentBackup) {
						if (successfulUploads.length >= desiredCompletedUploadCount) {
							for (const upload of successfulUploads) {
								//Immutable PTs are unaffected by staleness
								if (fullModel.isMutable) {
									const timeDiff = parseInt(new Date().getTime() + "") - parseInt(upload.completedTime);
									if (statusLevel === 0 && this.isTimeDifferenceConsideredTooLong(timeDiff)) {
										statusLevel = 1;
										statusText = "Stale";
									}
								}
							}
						} else {
							if (target.mostRecentBackup.id !== applicationState.currentBackupExecutionId) {
								if (successfulUploads.length === 0) {
									statusLevel = 2;
									statusText = "No Uploads";
								} else {
									statusLevel = 2;
									statusText = "Too Few Uploads";
								}
							} else {
								statusText = "Currently Running";
							}
						}
					} else {
						statusLevel = 1;
						statusText = "Not Run Yet";
					}

					const parsedNumber = parseInt(target.priorityLabel.substring(0, 1));
					return {
						id: target.id,
						name: target.name,
						fullPath: target.fullPath,
						priorityNumber:
							Number.isFinite(parsedNumber) && parsedNumber > 0 && parsedNumber < 8 ? parsedNumber : 10,
						mostRecentBackup: target.mostRecentBackup
							? {
									...target.mostRecentBackup,
									uploads: uploads,
									successfulUploads: successfulUploads,
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  }
							: null,
						isOpened: false,
						statusLevel: statusLevel,
						statusText: statusText,
					};
				})
				.sort((a, b) => {
					return a.priorityNumber - b.priorityNumber;
				}),
		};
	}

	private async populateData(): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const preservationCategories = await this.http
			.get<BasicPreservationCategory[]>(baseUrl + "/api/view/category/basic", {})
			.toPromise();
		const basicItemViews: BasicPreservationCategoryView[] = preservationCategories.map(
			(preservationCategory: BasicPreservationCategory) => {
				let statusLevel = 0;
				let statusText = "OK";

				//TODO: refactor
				//This is kind of calculating a proxy for Backup Execution State (which doesn't exist)
				//This says: if the most recent Backup Execution per PT is finished but didn't upload anything, there are major issues
				if (preservationCategory.uploadIssues) {
					statusLevel = 2;
					statusText = "Upload Errors";
				} else {
					//This means: for the PT Category, if there are any PTs that haven't finished uploading anything yet
					if (preservationCategory.furthestBackUploadCompletedTimeForTargetsMostRecentBackups === "-1") {
						statusLevel = 1;
						statusText = "Missing Runs";
					} else if (
						preservationCategory.furthestBackUploadCompletedTimeForTargetsMostRecentBackups === "-2"
					) {
						statusText = "Currently Running";
					} else {
						//Staleness rules only apply to mutable PTs
						if (preservationCategory.isMutable) {
							const timeSinceFurthestBackUploadCompletedTimeForTargetsMostRecentBackups =
								parseInt(new Date().getTime() + "") -
								parseInt(preservationCategory.furthestBackUploadCompletedTimeForTargetsMostRecentBackups);
							if (
								this.isTimeDifferenceConsideredTooLong(
									timeSinceFurthestBackUploadCompletedTimeForTargetsMostRecentBackups
								)
							) {
								statusLevel = 1;
								statusText = "Stale";
							}
						}
					}
				}

				return {
					...preservationCategory,
					isOpened: false,
					fullModel: null,
					statusLevel: statusLevel,
					statusText: statusText,
				};
			}
		);
		this.state.allMutableBasicViews = basicItemViews.filter((basicView) => basicView.isMutable);
		this.state.allImmutableBasicViews = basicItemViews.filter((basicView) => !basicView.isMutable);

		this.state.finishedInit = true;
	}

	private isTimeDifferenceConsideredTooLong(difference: number): boolean {
		//TODO: Make this configurable
		//hard-coded six weeks
		const tooLong = 6 * 7 * 24 * 60 * 60 * 1000;
		return difference > tooLong;
	}

	public getMostRecentUploadsForEtcViewFromBackupForEtcView(
		backup: BackupForEtcView
	): UploadsForEtcView {
		return backup.successfulUploads.sort((a, b) => {
			const aTime = a.completedTime ? a.completedTime : 0;
			const bTime = b.completedTime ? b.completedTime : 0;
			const aa = BigInt(aTime);
			const bb = BigInt(bTime);
			if (bb > aa) {
				return 1;
			} else if (bb < aa) {
				return -1;
			} else {
				return 0;
			}
		})[0];
	}

	public getDestinationStringFromBackupForEtcView(backup: BackupForEtcView): string {
		const segments: string[] = [];
		for (const upload of backup.successfulUploads) {
			segments.push(upload.destinationPath);
		}
		return segments.join(", ");
	}
}

export interface OverviewPageState {
	allMutableBasicViews: BasicPreservationCategoryView[];
	allImmutableBasicViews: BasicPreservationCategoryView[];
	finishedInit: boolean;
}

//
// DATA "View Models"
//

export interface BasicPreservationCategoryView {
	name: string;
	isMutable: boolean;
	isOpened: boolean;
	fullModel: PreservationCategoryView | null;
	furthestBackUploadCompletedTimeForTargetsMostRecentBackups: string;
	statusLevel: number; //0 normal, 1 warning, 2 error
	statusText: string;
	uploadIssues: boolean;
}

export interface PreservationCategoryView {
	name: string;
	isMutable: boolean;
	preservationTargets: PreservationCategoryPreservationTargetListItemView[];
}

export interface PreservationCategoryPreservationTargetListItemView {
	id: number;
	name: string;
	fullPath: string;
	priorityNumber: number;
	mostRecentBackup: BackupForEtcView | null;
	isOpened: boolean;
	statusLevel: number; //0 normal, 1 warning, 2 error
	statusText: string;
}

export interface BackupForEtcView {
	id: number;
	updatedTime: string; //this is kinda useless. its not changed after upload phase starts
	uploads: UploadsForEtcView[];
	successfulUploads: UploadsForEtcView[];
	sizeBytes: string;
	category: string;
}

export interface UploadsForEtcView {
	id: number;
	destination: string;
	destinationPath: string;
	completedTime: string;
	status: string;
}

//
// DATA DTOs
//

export interface BasicPreservationCategory {
	name: string;
	isMutable: boolean;
	furthestBackUploadCompletedTimeForTargetsMostRecentBackups: string;
	uploadIssues: boolean;
}

export interface PreservationCategory {
	name: string;
	isMutable: boolean;
	preservationTargets: PreservationCategoryPreservationTargetListItem[];
}

export interface PreservationCategoryPreservationTargetListItem {
	id: number;
	name: string;
	fullPath: string;
	priorityLabel: string;
	mostRecentBackup: BackupForEtc | null;
}

export interface BackupForEtc {
	id: number;
	updatedTime: string;
	uploads: UploadsForEtc[];
	sizeBytes: string;
	category: string;
}

export interface UploadsForEtc {
	id: number;
	destination: string;
	destinationPath: string;
	completedTime: string;
	status: string;
}
