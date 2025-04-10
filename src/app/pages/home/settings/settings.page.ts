import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import {
	ApplicationSettingsData,
	ApplicationSettingsDto,
} from "src/app/service/application-settings-data";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.page.html",
	styleUrls: ["./settings.page.scss"],
})
export class SettingsPage {
	public applicationSettingsModel: ApplicationSettingsDto = {
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

	constructor(
		private toastController: ToastController,
		private applicationSettingsData: ApplicationSettingsData
	) {}

	public async ionViewWillEnter() {
		this.applicationSettingsModel = await this.applicationSettingsData.getApplicationSettings();
	}

	private async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	public async onClickSaveMainSettings() {
		try {
			await this.applicationSettingsData.putApplicationSettings(this.applicationSettingsModel);
			await this.showToastMessage("Main Settings saved");
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}
}
