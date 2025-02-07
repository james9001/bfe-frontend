import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class SpeedSettingsData {
	public stateGettingInterval?: number;

	constructor(private http: HttpClient) {}

	public async getSpeedSettingState(): Promise<string> {
		return this.http
			.get(environment.bfeBackendBaseUrl + "/api/data/settings/speedsettingstate", {
				responseType: "text",
			})
			.toPromise();
	}

	public async setSpeedSetting(dto: SpeedSettingsDto): Promise<void> {
		await this.http
			.post(environment.bfeBackendBaseUrl + "/api/data/settings/speedsetting", dto, {
				responseType: "text",
			})
			.toPromise();
	}
}

export interface SpeedSettingsDto {
	rcloneBwLimit: string;
}
