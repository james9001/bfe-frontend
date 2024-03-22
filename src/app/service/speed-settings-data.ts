import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "./connection-data";

@Injectable({
	providedIn: "root",
})
export class SpeedSettingsData {
	public stateGettingInterval?: number;

	constructor(private http: HttpClient, private connectionData: ConnectionData) {}

	public async getSpeedSettingState(): Promise<string> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		return this.http
			.get(baseUrl + "/api/data/settings/speedsettingstate", { responseType: "text" })
			.toPromise();
	}

	public async setSpeedSetting(dto: SpeedSettingsDto): Promise<void> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		await this.http
			.post(baseUrl + "/api/data/settings/speedsetting", dto, { responseType: "text" })
			.toPromise();
	}
}

export interface SpeedSettingsDto {
	rcloneBwLimit: string;
}
