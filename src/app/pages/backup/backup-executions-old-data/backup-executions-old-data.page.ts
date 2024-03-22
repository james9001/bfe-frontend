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

type unit = "bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
type unitPrecisionMap = {
	[u in unit]: number;
};

@Component({
	selector: "app-backup-executions",
	templateUrl: "./backup-executions-old-data.page.html",
	styleUrls: ["./backup-executions-old-data.page.scss"],
})
export class BackupExecutionsOldDataPage extends AbstractListingPage {
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
				storagePersistenceKey: "backupexecutionsolddata",
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
				],
				apiPath: "backup/execution",
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

	public mapOutgoing(item: TableBackupExecution): BackupExecution {
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
		};
	}

	public mapIncoming(item: BackupExecution): TableBackupExecution {
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
		};
	}

	public getNewTableIdentifiable = (): TableBackupExecution => {
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
		};
	};
}

interface TableBackupExecution extends TableIdentifiable {
	id: number;
	preservationTargetId: number;
	artefactName: string;
	category: string;
	checksum: string;
	originalSize: string;
	finalSize: string;
}

export interface BackupExecution extends IdentifiableDto {
	id: number;
	preservationTargetId: number;
	artefactName: string;
	category: string;
	checksum: DirectoryChecksum;
	beforeProcessBytes: string;
	afterProcessBytes: string;
}

export interface DirectoryChecksum {
	checksumValue: string;
}
