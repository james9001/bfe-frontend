import { formatDate } from "@angular/common";
import { Component } from "@angular/core";
import {
	AbstractListingPage,
	PageState,
} from "src/app/components/shared/abstract-listing-page/abstract-listing-page";
import {
	IdentifiableDto,
	TableIdentifiable,
} from "src/app/components/shared/model/viewmodel-interface";

@Component({
	selector: "app-upload-executions",
	templateUrl: "./upload-executions-old-data.page.html",
	styleUrls: ["./upload-executions-old-data.page.scss"],
})
export class UploadExecutionsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "uploadexecutionsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Backup Execution Id" },
					{ name: "Status" },
					{ name: "Destination" },
					{ name: "Destination Path" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
					{ name: "Completed Time" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Backup Execution Id", shown: true, realName: "backupExecutionId" },
					{ name: "Status", shown: true, realName: "status" },
					{ name: "Destination", shown: true, realName: "destination" },
					{ name: "Destination Path", shown: true, realName: "destinationPath" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
					{ name: "Completed Time", shown: true, realName: "completedTime" },
				],
				apiPath: "upload/execution",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableUploadExecution): UploadExecution {
		return {
			id: item.id,
			backupExecutionId: item.backupExecutionId,
			status: item.status,
			destination: item.destination,
			destinationPath: item.destinationPath,
			createdTime: "",
			updatedTime: "",
			completedTime: "",
		};
	}

	public mapIncoming(item: UploadExecution): TableUploadExecution {
		const completedTimePretty = item.completedTime
			? formatDate(item.completedTime, "yyyy-MM-dd h:mm a", "en-US")
			: "";
		return {
			id: item.id,
			backupExecutionId: item.backupExecutionId,
			status: item.status,
			destination: item.destination,
			destinationPath: item.destinationPath,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
			completedTime: completedTimePretty,
		};
	}

	public getNewTableIdentifiable(): TableUploadExecution {
		return {
			id: -1,
			backupExecutionId: -1,
			status: "",
			destination: "",
			destinationPath: "",
			createdTime: "",
			updatedTime: "",
			completedTime: "",
		};
	}
}

interface TableUploadExecution extends TableIdentifiable {
	id: number;
	backupExecutionId: number;
	status: string;
	destination: string;
	destinationPath: string;
	completedTime: string;
}

export interface UploadExecution extends IdentifiableDto {
	id: number;
	backupExecutionId: number;
	status: string;
	destination: string;
	destinationPath: string;
	completedTime: string;
}
