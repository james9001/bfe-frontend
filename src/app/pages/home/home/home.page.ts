import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { ToastController } from "@ionic/angular";
import {
	ApplicationSettingsDto,
	ApplicationSettingsData,
} from "src/app/service/application-settings-data";
import { ApplicationState, ApplicationStateData } from "src/app/service/application-state-data";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
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

	public terminateButtonAvailable = false;

	constructor(
		private toastController: ToastController,
		private applicationStateData: ApplicationStateData,
		public http: HttpClient,
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
		this.terminateButtonAvailable =
			this.state._status == "DOING_BACKUP" ||
			this.state._status == "DOING_RESTORATION" ||
			(this.state._status == "DOING_UPLOAD" && this.state.currentUploadExecutionId == -1);
		this.settings = await this.applicationSettingsData.getApplicationSettings();
	};

	public onClickTerminate = async () => {
		try {
			const result = await this.http
				.post(environment.bfeBackendBaseUrl + "/api/execution/terminate", {}, { responseType: "text" })
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
