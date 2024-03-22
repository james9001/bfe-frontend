import { Component, HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "src/app/service/connection-data";
import { ApplicationStateData } from "src/app/service/application-state-data";

@Component({
	selector: "app-automatic-mode-toggler",
	templateUrl: "./automatic-mode-toggler.component.html",
	styleUrls: ["./automatic-mode-toggler.component.scss"],
})
export class AutomaticModeTogglerComponent {
	public model: AutomaticModeToggleDto = {
		inAutomaticMode: false,
	};

	private updatingToggle = false;

	constructor(
		private http: HttpClient,
		private applicationStateData: ApplicationStateData,
		private connectionData: ConnectionData
	) {}

	@HostListener("window:realtimestatus")
	public realTimeStatusUpdate = async () => {
		if (!this.updatingToggle) {
			const state = await this.applicationStateData.getCurrentState();
			this.model.inAutomaticMode = state.inAutomaticMode;
		}
	};

	public onClick = async (): Promise<void> => {
		this.updatingToggle = true;

		setTimeout(async () => {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;

			await this.http.put(baseUrl + "/api/automatic-mode/toggle", this.model, {}).toPromise();

			this.updatingToggle = false;
		}, 1);
	};
}

interface AutomaticModeToggleDto {
	inAutomaticMode: boolean;
}
