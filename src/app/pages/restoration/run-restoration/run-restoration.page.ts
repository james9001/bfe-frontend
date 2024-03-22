import { Component } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { ConnectionData } from "src/app/service/connection-data";

@Component({
	selector: "app-restoration-run",
	templateUrl: "./run-restoration.page.html",
	styleUrls: ["./run-restoration.page.scss"],
})
export class RunRestorationPage {
	public model: RestorationExecutionDto = {
		aesPassword: "",
		camelliaPassword: "",
		category: "",
		checksum: "",
		sourceDir: "",
		destinationDir: "",
	};

	constructor(
		private toastController: ToastController,
		public http: HttpClient,
		private connectionData: ConnectionData
	) {}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	public async onClickPlay() {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const result = await this.http
				.post(baseUrl + "/api/execution/restoration", this.model, { responseType: "text" })
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

export interface RestorationExecutionDto {
	aesPassword: string;
	camelliaPassword: string;
	category: string;
	checksum: string;
	sourceDir: string;
	destinationDir: string;
}
