import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ApplicationSettingsData } from "src/app/service/application-settings-data";
import { ConnectionData } from "src/app/service/connection-data";

@Component({
	selector: "app-backup-upload-run",
	templateUrl: "./run-backup.page.html",
	styleUrls: ["./run-backup.page.scss"],
})
export class RunBackupPage {
	public model: BackupExecutionDto = {
		preservationTargetId: -1,
		backupCategory: "",
	};

	constructor(
		private toastController: ToastController,
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

	public async ionViewWillEnter() {
		const settings = await this.applicationSettingsData.getApplicationSettings();
		this.model.backupCategory = settings.defaultBackupCategory;
	}

	public async onClickPlay() {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/backup", this.model, { responseType: "text" })
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}
}

export interface BackupExecutionDto {
	preservationTargetId: number;
	backupCategory: string;
}
