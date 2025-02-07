import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class KillCurrentProcessData {
	constructor(private http: HttpClient) {}

	public async postKillCurrentProcess(): Promise<string> {
		return this.http
			.post(
				environment.bfeBackendBaseUrl + "/api/data/state/killcurrentprocess",
				{},
				{ responseType: "text" }
			)
			.toPromise();
	}
}
