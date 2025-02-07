import { Component } from "@angular/core";
import { formatDate } from "@angular/common";
import {
	IdentifiableDto,
	TableIdentifiable,
} from "src/app/components/shared/model/viewmodel-interface";
import {
	AbstractListingPage,
	PageState,
} from "src/app/components/shared/abstract-listing-page/abstract-listing-page";
import {
	SearchCriteria,
	SearchPage,
	SearchResponse,
} from "src/app/components/shared/genericdatatable/genericdatatable.component";
import { DirectoryChecksum } from "../backup-executions-old-data/backup-executions-old-data.page";
import { environment } from "src/environments/environment";

type unit = "bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
type unitPrecisionMap = {
	[u in unit]: number;
};

@Component({
	selector: "app-backup-executions-data",
	templateUrl: "./backup-executions-data.page.html",
	styleUrls: ["./backup-executions-data.page.scss"],
})
export class BackupExecutionsDataPage extends AbstractListingPage {
	//New special ViewPage stuff begin
	public page: SearchPage = {
		pageSize: 1,
		pageNumber: 0,
		totalElements: -1,
	};

	protected override async loadData(): Promise<void> {
		const config = await this.dataTableData.getGenericDataTableConfiguration(
			this.state.dataTableConfiguration
		);
		const criteria: SearchCriteria = {
			pageNumber: this.page.pageNumber,
			pageSize: config.pageSize,
		};

		const response = await this.http
			.post<SearchResponse<BackupExecutionView>>(
				environment.bfeBackendBaseUrl + "/api/data/view/backup/search",
				criteria
			)
			.toPromise();
		this.page = response.page;

		this.state.allModels = [];
		this.state.currentModels = [];
		for (const item of response.data) {
			this.state.allModels.push(this.mapIncoming(item));
			this.state.currentModels.push(this.mapIncoming(item));
		}
		this.state.isTableHidden = false;
	}

	public async onSetPageFired(): Promise<void> {
		void this.loadData();
	}

	//New special ViewPage stuff end

	private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];

	public readonly defaultPrecisionMap: unitPrecisionMap = {
		bytes: 0,
		KB: 0,
		MB: 1,
		GB: 1,
		TB: 2,
		PB: 2,
	};

	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "backupexecutionsdata",
				columns: [
					{ name: "Id" },
					{ name: "Preservation Target Id" },
					{ name: "Artefact Name" },
					{ name: "Category" },
					{ name: "Checksum" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
					{ name: "Original Size" },
					{ name: "Final Size" },
					{ name: "Upload Execution Count" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Preservation Target Id", shown: true, realName: "preservationTargetId" },
					{ name: "Artefact Name", shown: true, realName: "artefactName" },
					{ name: "Category", shown: true, realName: "category" },
					{ name: "Checksum", shown: true, realName: "checksum" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
					{ name: "Original Size", shown: true, realName: "originalSize" },
					{ name: "Final Size", shown: true, realName: "finalSize" },
					{ name: "Upload Execution Count", shown: true, realName: "uploadExecutionCount" },
				],
				apiPath: "view/backup/execution",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	private transformBytesNumberIntoHumanReadable(
		bytes: number,
		precision: number | unitPrecisionMap = this.defaultPrecisionMap
	): string {
		if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return "?";

		let unitIndex = 0;

		while (bytes >= 1024) {
			bytes /= 1024;
			unitIndex++;
		}

		const unit = this.units[unitIndex];

		if (typeof precision === "number") {
			return `${bytes.toFixed(+precision)} ${unit}`;
		}
		return `${bytes.toFixed(precision[unit])} ${unit}`;
	}

	public mapOutgoing(item: TableBackupExecutionView): BackupExecutionView {
		return {
			id: item.id,
			preservationTargetId: item.preservationTargetId,
			artefactName: item.artefactName,
			category: item.category,
			checksum: { checksumValue: item.checksum },
			createdTime: "",
			updatedTime: "",
			beforeProcessBytes: "",
			afterProcessBytes: "",
			uploadExecutionCount: 0,
		};
	}

	public mapIncoming(item: BackupExecutionView): TableBackupExecutionView {
		return {
			id: item.id,
			preservationTargetId: item.preservationTargetId,
			artefactName: item.artefactName,
			category: item.category,
			checksum: item.checksum.checksumValue,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
			originalSize: this.transformBytesNumberIntoHumanReadable(+item.beforeProcessBytes),
			finalSize: this.transformBytesNumberIntoHumanReadable(+item.afterProcessBytes),
			uploadExecutionCount: item.uploadExecutionCount,
		};
	}

	public getNewTableIdentifiable = (): TableBackupExecutionView => {
		return {
			id: -1,
			preservationTargetId: -1,
			artefactName: "",
			category: "",
			checksum: "",
			createdTime: "",
			updatedTime: "",
			originalSize: "",
			finalSize: "",
			uploadExecutionCount: 0,
		};
	};
}

interface TableBackupExecutionView extends TableIdentifiable {
	id: number;
	preservationTargetId: number;
	artefactName: string;
	category: string;
	checksum: string;
	originalSize: string;
	finalSize: string;
	uploadExecutionCount: number;
}

export interface BackupExecutionView extends IdentifiableDto {
	id: number;
	preservationTargetId: number;
	artefactName: string;
	category: string;
	checksum: DirectoryChecksum;
	beforeProcessBytes: string;
	afterProcessBytes: string;
	uploadExecutionCount: number;
}
