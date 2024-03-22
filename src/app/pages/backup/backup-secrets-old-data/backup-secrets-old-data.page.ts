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
	selector: "app-backup-secrets",
	templateUrl: "./backup-secrets-old-data.page.html",
	styleUrls: ["./backup-secrets-old-data.page.scss"],
})
export class BackupSecretsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "backupsecretsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Backup Execution Id" },
					{ name: "Encryption Type" },
					{ name: "Order Number" },
					{ name: "Secret Value" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Backup Execution Id", shown: true, realName: "backupExecutionId" },
					{ name: "Encryption Type", shown: true, realName: "encryptionType" },
					{ name: "Order Number", shown: true, realName: "orderNumber" },
					{ name: "Secret Value", shown: true, realName: "secretValue" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
				],
				apiPath: "backup-secret/secret",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableBackupSecret): BackupSecret {
		return {
			id: item.id,
			backupExecutionId: item.backupExecutionId,
			encryptionType: item.encryptionType,
			orderNumber: item.orderNumber,
			secretValue: item.secretValue,
			createdTime: "",
			updatedTime: "",
		};
	}

	public mapIncoming(item: BackupSecret): TableBackupSecret {
		return {
			id: item.id,
			backupExecutionId: item.backupExecutionId,
			encryptionType: item.encryptionType,
			orderNumber: item.orderNumber,
			secretValue: item.secretValue,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
		};
	}

	public getNewTableIdentifiable(): TableBackupSecret {
		return {
			id: -1,
			backupExecutionId: -1,
			encryptionType: "",
			orderNumber: -1,
			secretValue: "",
			createdTime: "",
			updatedTime: "",
		};
	}
}

interface TableBackupSecret extends TableIdentifiable {
	id: number;
	backupExecutionId: number;
	encryptionType: string;
	orderNumber: number;
	secretValue: string;
}

interface BackupSecret extends IdentifiableDto {
	id: number;
	backupExecutionId: number;
	encryptionType: string;
	orderNumber: number;
	secretValue: string;
}
