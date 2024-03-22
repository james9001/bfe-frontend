import { Component, HostListener } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { ConnectionData } from "src/app/service/connection-data";
import {
	ApplicationSettingsDto,
	ApplicationSettingsData,
} from "src/app/service/application-settings-data";
import { ApplicationState, ApplicationStateData } from "src/app/service/application-state-data";
import { UploadExecution } from "../upload-executions-old-data/upload-executions-old-data.page";

@Component({
	selector: "app-current-upload",
	templateUrl: "./current-upload.page.html",
	styleUrls: ["./current-upload.page.scss"],
})
export class CurrentUploadPage {
	public state: ApplicationState = {
		id: 0,
		_status: "UNKNOWN",
		currentBackupExecutionId: 0,
		currentUploadExecutionId: 0,
		currentRestorationExecutionId: 0,
		inErrorState: false,
		inAutomaticMode: false,
	};
	public settings: ApplicationSettingsDto = {
		rcloneBwLimit: "",
		defaultUploadDestination: "",
		defaultUploadPath: "",
		defaultBackupCategory: "",
		defaultSecondUploadDestination: "",
		defaultSecondUploadPath: "",
		showOldDataPages: false,
		uploadToTwoTargets: false,
		backupCopyPhaseBwLimit: "",
	};
	public uploadExecution?: UploadExecution;

	constructor(
		private toastController: ToastController,
		private applicationStateData: ApplicationStateData,
		public http: HttpClient,
		private connectionData: ConnectionData,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		this.state = await this.applicationStateData.getCurrentState();
		if (this.state._status == "DOING_UPLOAD") {
			this.uploadExecution = await this.applicationStateData.getCurrentUploadExecution();
			this.settings = await this.applicationSettingsData.getApplicationSettings();
		}
	};

	public onClickPause = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload/action/pause", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
	public onClickResume = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload/action/resume", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
	public onClickRemove = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload/action/remove", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
	public onClickStart = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload/action/start", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
	public onClickFinalise = async () => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload/action/finalise", {}, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	};
}
