import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConnectionData } from "./connection-data";
import { BackupExecution } from "../pages/backup/backup-executions-old-data/backup-executions-old-data.page";
import { UploadExecution } from "../pages/upload/upload-executions-old-data/upload-executions-old-data.page";

/*
TODO: Refactor
*/
@Injectable({
	providedIn: "root",
})
export class ApplicationStateData {
	private state?: ApplicationState;
	private currentBackupExecution?: BackupExecution;
	private currentUploadExecution?: UploadExecution;

	constructor(private http: HttpClient, private connectionData: ConnectionData) {}

	public getCurrentUploadExecution = async (): Promise<UploadExecution | undefined> => {
		return this.currentUploadExecution;
	};

	public getFreshUploadExecution = async (): Promise<UploadExecution | undefined> => {
		if (!this.state || this.state.currentUploadExecutionId < 1) {
			this.currentUploadExecution = undefined;
			return undefined;
		}
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const currentUploadExecution = await this.http
			.get<UploadExecution>(
				baseUrl + "/api/data/upload/execution/" + this.state.currentUploadExecutionId,
				{}
			)
			.toPromise();
		this.currentUploadExecution = currentUploadExecution;
		return currentUploadExecution;
	};

	public getCurrentBackupExecution = async (): Promise<BackupExecution | undefined> => {
		return this.currentBackupExecution;
	};

	public getFreshBackupExecution = async (): Promise<BackupExecution | undefined> => {
		if (!this.state || this.state.currentBackupExecutionId < 1) {
			this.currentBackupExecution = undefined;
			return undefined;
		}
		const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
		const currentBackupExecution = await this.http
			.get<BackupExecution>(
				baseUrl + "/api/data/backup/execution/" + this.state.currentBackupExecutionId,
				{}
			)
			.toPromise();
		this.currentBackupExecution = currentBackupExecution;
		return currentBackupExecution;
	};

	public getCurrentState = async (): Promise<ApplicationState> => {
		if (!this.state) {
			return this.getFreshState();
		}
		return this.state;
	};

	public getFreshState = async (): Promise<ApplicationState> => {
		try {
			const baseUrl = (await this.connectionData.getConnection()).apiBaseUrl;
			const state = await this.http
				.get<ApplicationState>(baseUrl + "/api/data/state/state", {})
				.toPromise();
			this.state = state;
			return state;
		} catch {
			return {
				id: 0,
				_status: "DISCONNECTED",
				currentBackupExecutionId: 0,
				currentUploadExecutionId: 0,
				currentRestorationExecutionId: 0,
				inErrorState: false,
				inAutomaticMode: false,
			};
		}
	};
}

export interface ApplicationState {
	id: number;
	_status: string;
	currentBackupExecutionId: number;
	currentUploadExecutionId: number;
	currentRestorationExecutionId: number;
	inErrorState: boolean;
	inAutomaticMode: boolean;
}