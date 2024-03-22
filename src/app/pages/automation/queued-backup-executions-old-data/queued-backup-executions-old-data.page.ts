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
	selector: "app-queued-backup-executions",
	templateUrl: "./queued-backup-executions-old-data.page.html",
	styleUrls: ["./queued-backup-executions-old-data.page.scss"],
})
export class QueuedBackupExecutionsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "queuedbackupexecutionsolddata",
				columns: [
					{ name: "Id" },

					{ name: "Preservation Target Id" },
					{ name: "Order Number" },
					{ name: "Intended Backup Category" },
					{ name: "Intended Upload Destination" },
					{ name: "Intended Upload Path" },
					{ name: "Second Intended Upload Destination" },
					{ name: "Second Intended Upload Path" },
					{ name: "Actual Backup Execution Id" },

					{ name: "Created Time" },
					{ name: "Updated Time" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },

					{ name: "Preservation Target Id", shown: true, realName: "preservationTargetId" },
					{ name: "Order Number", shown: true, realName: "orderNumber" },
					{ name: "Intended Backup Category", shown: true, realName: "intendedBackupCategory" },
					{ name: "Intended Upload Destination", shown: true, realName: "intendedUploadDestination" },
					{ name: "Intended Upload Path", shown: true, realName: "intendedUploadPath" },
					{
						name: "Second Intended Upload Destination",
						shown: true,
						realName: "secondIntendedUploadDestination",
					},
					{ name: "Second Intended Upload Path", shown: true, realName: "secondIntendedUploadPath" },
					{ name: "Actual Backup Execution Id", shown: true, realName: "actualBackupExecutionId" },

					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
				],
				apiPath: "queued-backup-execution/queued-backup-execution",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableQueuedBackupExecution): QueuedBackupExecution {
		return {
			id: item.id,

			preservationTargetId: item.preservationTargetId,
			orderNumber: item.orderNumber,
			intendedBackupCategory: item.intendedBackupCategory,
			intendedUploadDestination: item.intendedUploadDestination,
			intendedUploadPath: item.intendedUploadPath,
			secondIntendedUploadDestination: item.secondIntendedUploadDestination,
			secondIntendedUploadPath: item.secondIntendedUploadPath,
			actualBackupExecutionId: item.actualBackupExecutionId,

			createdTime: "",
			updatedTime: "",
		};
	}

	public mapIncoming(item: QueuedBackupExecution): TableQueuedBackupExecution {
		return {
			id: item.id,

			preservationTargetId: item.preservationTargetId,
			orderNumber: item.orderNumber,
			intendedBackupCategory: item.intendedBackupCategory,
			intendedUploadDestination: item.intendedUploadDestination,
			intendedUploadPath: item.intendedUploadPath,
			secondIntendedUploadDestination: item.secondIntendedUploadDestination,
			secondIntendedUploadPath: item.secondIntendedUploadPath,
			actualBackupExecutionId: item.actualBackupExecutionId,

			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
		};
	}

	public getNewTableIdentifiable = (): TableQueuedBackupExecution => {
		return {
			id: -1,

			preservationTargetId: -1,
			orderNumber: -1,
			intendedBackupCategory: "",
			intendedUploadDestination: "",
			intendedUploadPath: "",
			secondIntendedUploadDestination: "",
			secondIntendedUploadPath: "",
			actualBackupExecutionId: -1,

			createdTime: "",
			updatedTime: "",
		};
	};
}

interface TableQueuedBackupExecution extends TableIdentifiable {
	preservationTargetId: number;
	orderNumber: number;
	intendedBackupCategory: string;
	intendedUploadDestination: string;
	intendedUploadPath: string;
	secondIntendedUploadDestination: string;
	secondIntendedUploadPath: string;
	actualBackupExecutionId: number;
}

export interface QueuedBackupExecution extends IdentifiableDto {
	preservationTargetId: number;
	orderNumber: number;
	intendedBackupCategory: string;
	intendedUploadDestination: string;
	intendedUploadPath: string;
	secondIntendedUploadDestination: string;
	secondIntendedUploadPath: string;
	actualBackupExecutionId: number;
}
