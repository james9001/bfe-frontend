import { Component, HostListener } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ApplicationSettingsData } from "src/app/service/application-settings-data";
import { ApplicationState, ApplicationStateData } from "src/app/service/application-state-data";
import { SpeedSettingsData, SpeedSettingsDto } from "src/app/service/speed-settings-data";
import { UploadExecution } from "../../upload/upload-executions-old-data/upload-executions-old-data.page";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-speed",
	templateUrl: "./speed.page.html",
	styleUrls: ["./speed.page.scss"],
})
export class SpeedPage {
	public state: ApplicationState = {
		id: 0,
		_status: "UNKNOWN",
		currentBackupExecutionId: 0,
		currentUploadExecutionId: 0,
		currentRestorationExecutionId: 0,
		inErrorState: false,
		inAutomaticMode: false,
	};
	public uploadExecution?: UploadExecution;

	public speedSettingsModel: SpeedSettingsDto = {
		rcloneBwLimit: "",
	};

	constructor(
		private toastController: ToastController,
		private speedSettingsData: SpeedSettingsData,
		private applicationStateData: ApplicationStateData,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		this.state = await this.applicationStateData.getCurrentState();
		if (this.state._status == "DOING_UPLOAD") {
			this.uploadExecution = await this.applicationStateData.getCurrentUploadExecution();
		} else {
			this.uploadExecution = undefined;
		}
	};

	public async ionViewWillEnter() {
		this.speedSettingsModel.rcloneBwLimit = (
			await this.applicationSettingsData.getApplicationSettings()
		).rcloneBwLimit;

		this.speedSettingsModel = await this.applicationSettingsData.getApplicationSettings();
	}

	public async ionViewDidEnter() {
		clearInterval(this.speedSettingsData.stateGettingInterval);
		this.speedSettingsData.stateGettingInterval = window.setInterval(() => {
			void this.showSpeedSettingState(this.speedSettingsData);
		}, 1000);
	}

	public async ionViewWillLeave() {
		window.clearInterval(this.speedSettingsData.stateGettingInterval);
	}

	private async showSpeedSettingState(data: SpeedSettingsData): Promise<void> {
		const stateMessage = await data.getSpeedSettingState();
		if (stateMessage) {
			void this.showToastMessage(stateMessage);
		}
	}

	private async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message.substring(3),
			duration: 1000,
			color:
				message.substring(0, 1) === "S"
					? "success"
					: message.substring(0, 1) === "D"
					? "danger"
					: "primary",
		});
		await toast.present();
	}

	public async onClickDoIt() {
		try {
			await this.speedSettingsData.setSpeedSetting(this.speedSettingsModel);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}
}
