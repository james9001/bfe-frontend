import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApplicationStateData, ApplicationState } from "src/app/service/application-state-data";
import { PreservationTarget } from "src/app/pages/backup/preservation-targets-old-data/preservation-targets-old-data.page";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-real-time-status",
	templateUrl: "./real-time-status.component.html",
	styleUrls: ["./real-time-status.component.scss"],
})
export class RealTimeStatusComponent implements OnInit {
	public mainStatus = "DISCONNECTED";
	public detailsText = "";
	public inErrorState = false;
	public inAutomaticMode = false;

	constructor(private http: HttpClient, private applicationStateData: ApplicationStateData) {}

	ngOnInit() {
		setInterval(this.doStatusCheck, 1000);
	}

	private doStatusCheck = async (): Promise<void> => {
		const status = await this.applicationStateData.getFreshState();
		if (status._status != "DISCONNECTED") {
			await Promise.all([
				this.applicationStateData.getFreshBackupExecution(),
				this.applicationStateData.getFreshUploadExecution(),
			]);
		}
		this.mainStatus = status._status;
		this.inErrorState = status.inErrorState;
		this.inAutomaticMode = status.inAutomaticMode;
		await this.doDetailsTextUpdate(status);
		window.dispatchEvent(new CustomEvent("realtimestatus"));
	};

	private doDetailsTextUpdate = async (status: ApplicationState): Promise<void> => {
		if (status._status == "DOING_BACKUP" || status._status == "DOING_UPLOAD") {
			const currentBackupExecution = await this.applicationStateData.getCurrentBackupExecution();
			const preservationTarget = await this.http
				.get<PreservationTarget>(
					environment.bfeBackendBaseUrl +
						"/api/data/preservation-target/target/" +
						currentBackupExecution!.preservationTargetId,
					{}
				)
				.toPromise();

			const pathParts = preservationTarget.fullPath.split("/");
			this.detailsText = pathParts[pathParts.length - 1];
		}
		if (status._status == "DOING_RESTORATION") {
			this.detailsText = "";
		}
		if (status._status == "FREE") {
			this.detailsText = "";
		}
		if (status._status == "DISCONNECTED") {
			this.detailsText = "";
		}
	};
}
