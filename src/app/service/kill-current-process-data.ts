import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "./connection-data";

@Injectable({
	providedIn: "root",
})
export class KillCurrentProcessData {
	constructor(private http: HttpClient, private connectionData: ConnectionData) {}

	public async postKillCurrentProcess(): Promise<string> {
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		return this.http
			.post(baseUrl + "/api/data/state/killcurrentprocess", {}, { responseType: "text" })
			.toPromise();
	}
}
