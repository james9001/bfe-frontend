import { Component, HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApplicationStateData } from "src/app/service/application-state-data";
import { environment } from "src/environments/environment";

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

	constructor(private http: HttpClient, private applicationStateData: ApplicationStateData) {}

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
			await this.http
				.put(environment.bfeBackendBaseUrl + "/api/automatic-mode/toggle", this.model, {})
				.toPromise();

			this.updatingToggle = false;
		}, 1);
	};
}

interface AutomaticModeToggleDto {
	inAutomaticMode: boolean;
}
