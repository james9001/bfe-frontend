import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ApplicationSettingsData {
	constructor(private http: HttpClient) {}

	public async getApplicationSettings(): Promise<ApplicationSettingsDto> {
		return this.http
			.get<ApplicationSettingsDto>(environment.bfeBackendBaseUrl + "/api/data/settings/settings", {})
			.toPromise();
	}

	public async putApplicationSettings(dto: ApplicationSettingsDto): Promise<void> {
		await this.http
			.put(environment.bfeBackendBaseUrl + "/api/data/settings/settings", dto, {})
			.toPromise();
		window.dispatchEvent(new CustomEvent("settingschange"));
	}
}

export interface ApplicationSettingsDto {
	rcloneBwLimit: string;
	defaultUploadDestination: string;
	defaultUploadPath: string;
	defaultBackupCategory: string;
	defaultSecondUploadDestination: string;
	defaultSecondUploadPath: string;
	showOldDataPages: boolean;
	uploadToTwoTargets: boolean;
	backupCopyPhaseBwLimit: string;
}
