import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ApplicationSettingsData } from "src/app/service/application-settings-data";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-batch-run",
	templateUrl: "./run-batch.page.html",
	styleUrls: ["./run-batch.page.scss"],
})
export class RunBatchPage {
	public model: BatchExecutionDto = {
		preservationTargetCategoryForBatch: "",
		batchBackupCategory: "",
		batchUploadDestination: "",
		batchUploadPath: "",
		batchSecondUploadDestination: "",
		batchSecondUploadPath: "",
	};

	public uploadToTwoTargetsEnabled = false;

	constructor(
		private toastController: ToastController,
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

	public async ionViewWillEnter() {
		const settings = await this.applicationSettingsData.getApplicationSettings();
		this.model.batchBackupCategory = settings.defaultBackupCategory;
		this.model.batchUploadDestination = settings.defaultUploadDestination;
		this.model.batchUploadPath = settings.defaultUploadPath;
		if (settings.uploadToTwoTargets) {
			this.model.batchSecondUploadDestination = settings.defaultSecondUploadDestination;
			this.model.batchSecondUploadPath = settings.defaultSecondUploadPath;
			this.uploadToTwoTargetsEnabled = true;
		}
	}

	public async onClickCreateBatch() {
		try {
			const result = await this.http
				.post(environment.bfeBackendBaseUrl + "/api/execution/batch/batch", this.model, {
					responseType: "text",
				})
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}

	public async onClickDeleteExisting() {
		try {
			const result = await this.http
				.delete(environment.bfeBackendBaseUrl + "/api/execution/batch/", { responseType: "text" })
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

export interface BatchExecutionDto {
	preservationTargetCategoryForBatch: string;
	batchBackupCategory: string;
	batchUploadDestination: string;
	batchUploadPath: string;
	batchSecondUploadDestination: string;
	batchSecondUploadPath: string;
}
