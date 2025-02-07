import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BackupExecution } from "../pages/backup/backup-executions-old-data/backup-executions-old-data.page";
import { UploadExecution } from "../pages/upload/upload-executions-old-data/upload-executions-old-data.page";
import { environment } from "src/environments/environment";

/*
TODO: Refactor
*/
@Injectable({
	providedIn: "root",
})
export class ApplicationStateData {
	private state?: ApplicationState;
	private currentBackupExecution?: BackupExecution;
	private currentUploadExecution?: UploadExecution;

	constructor(private http: HttpClient) {}

	public getCurrentUploadExecution = async (): Promise<UploadExecution | undefined> => {
		return this.currentUploadExecution;
	};

	public getFreshUploadExecution = async (): Promise<UploadExecution | undefined> => {
		if (!this.state || this.state.currentUploadExecutionId < 1) {
			this.currentUploadExecution = undefined;
			return undefined;
		}
		const currentUploadExecution = await this.http
			.get<UploadExecution>(
				environment.bfeBackendBaseUrl +
					"/api/data/upload/execution/" +
					this.state.currentUploadExecutionId,
				{}
			)
			.toPromise();
		this.currentUploadExecution = currentUploadExecution;
		return currentUploadExecution;
	};

	public getCurrentBackupExecution = async (): Promise<BackupExecution | undefined> => {
		return this.currentBackupExecution;
	};

	public getFreshBackupExecution = async (): Promise<BackupExecution | undefined> => {
		if (!this.state || this.state.currentBackupExecutionId < 1) {
			this.currentBackupExecution = undefined;
			return undefined;
		}
		const currentBackupExecution = await this.http
			.get<BackupExecution>(
				environment.bfeBackendBaseUrl +
					"/api/data/backup/execution/" +
					this.state.currentBackupExecutionId,
				{}
			)
			.toPromise();
		this.currentBackupExecution = currentBackupExecution;
		return currentBackupExecution;
	};

	public getCurrentState = async (): Promise<ApplicationState> => {
		if (!this.state) {
			return this.getFreshState();
		}
		return this.state;
	};

	public getFreshState = async (): Promise<ApplicationState> => {
		try {
			const state = await this.http
				.get<ApplicationState>(environment.bfeBackendBaseUrl + "/api/data/state/state", {})
				.toPromise();
			this.state = state;
			return state;
		} catch {
			return {
				id: 0,
				_status: "DISCONNECTED",
				currentBackupExecutionId: 0,
				currentUploadExecutionId: 0,
				currentRestorationExecutionId: 0,
				inErrorState: false,
				inAutomaticMode: false,
			};
		}
	};
}

export interface ApplicationState {
	id: number;
	_status: string;
	currentBackupExecutionId: number;
	currentUploadExecutionId: number;
	currentRestorationExecutionId: number;
	inErrorState: boolean;
	inAutomaticMode: boolean;
}
