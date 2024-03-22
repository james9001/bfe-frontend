import { Component, HostListener, OnInit } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import {
	ApplicationSettingsData,
	ApplicationSettingsDto,
} from "./service/application-settings-data";
import { KillCurrentProcessData } from "./service/kill-current-process-data";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
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

	constructor(
		private appSettingsData: ApplicationSettingsData,
		private toastController: ToastController,
		private alertController: AlertController,
		private killCurrentProcessData: KillCurrentProcessData
	) {}

	public async ngOnInit(): Promise<void> {
		this.settings = await this.appSettingsData.getApplicationSettings();
	}

	@HostListener("window:settingschange")
	public async getSettingsAgain(): Promise<void> {
		this.settings = await this.appSettingsData.getApplicationSettings();
	}

	public async onClickKillCurrentProcess(): Promise<void> {
		const alert = await this.alertController.create({
			header: "Kill current child process(es)?",
			buttons: [
				{
					text: "No",
					role: "cancel",
					handler: () => {
						console.log("Kill cancelled");
					},
				},
				{
					text: "Kill",
					role: "confirm",
					handler: () => {
						void this.killCurrentProcessData.postKillCurrentProcess().then((response) => {
							void this.showToastMessage(response);
						});
					},
				},
			],
		});
		await alert.present();
	}

	private async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 1000,
		});
		await toast.present();
	}
}
