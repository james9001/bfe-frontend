import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-pt-autocreate",
	templateUrl: "./pt-autocreate.page.html",
})
export class PtAutocreatePage {
	public model: PtAutocreateRunModel = {
		watchDirectoriesCommaSeparatedList: "",
		preservationTargetType: "",
		preservationTargetCategory: "",
	};

	constructor(private toastController: ToastController, public http: HttpClient) {}

	public async showToastMessage(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 5000,
		});
		await toast.present();
	}

	public async onClickRun() {
		const requestDto: PtAutocreateRunDto = {
			watchDirectories: this.model.watchDirectoriesCommaSeparatedList
				.split(",")
				.map((watchDirectory) => watchDirectory.replace(/"/g, "")),
			preservationTargetType: this.model.preservationTargetType,
			preservationTargetCategory: this.model.preservationTargetCategory,
		};
		try {
			const result = await this.http
				.post(
					environment.bfeBackendBaseUrl + "/api/data/preservation-target-auto-creator/run",
					requestDto,
					{
						responseType: "text",
					}
				)
				.toPromise();
			await this.showToastMessage(result);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse) {
				console.log(err);
				await this.showToastMessage(err.error);
			}
		}
	}

	public async onClickOops() {
		try {
			const result = await this.http
				.post(
					environment.bfeBackendBaseUrl + "/api/data/preservation-target-auto-creator/oops",
					{},
					{ responseType: "text" }
				)
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

interface PtAutocreateRunDto {
	watchDirectories: string[];
	preservationTargetType: string;
	preservationTargetCategory: string;
}

export interface PtAutocreateRunModel {
	watchDirectoriesCommaSeparatedList: string;
	preservationTargetType: string;
	preservationTargetCategory: string;
}
