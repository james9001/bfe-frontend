import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ApplicationSettingsData } from "src/app/service/application-settings-data";
import { ConnectionData } from "src/app/service/connection-data";

@Component({
	selector: "app-upload-run",
	templateUrl: "./run-upload.page.html",
	styleUrls: ["./run-upload.page.scss"],
})
export class RunUploadPage {
	public model: UploadExecutionDto = {
		destination: "",
		destinationPath: "",
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
		this.model.destination = settings.defaultUploadDestination;
		this.model.destinationPath = settings.defaultUploadPath;
	}

	public async onClickPlay() {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/upload", this.model, { responseType: "text" })
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

export interface UploadExecutionDto {
	destination: string;
	destinationPath: string;
}
