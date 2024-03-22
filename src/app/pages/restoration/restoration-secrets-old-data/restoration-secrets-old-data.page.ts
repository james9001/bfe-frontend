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
	selector: "app-restoration-secrets",
	templateUrl: "./restoration-secrets-old-data.page.html",
	styleUrls: ["./restoration-secrets-old-data.page.scss"],
})
export class RestorationSecretsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "restorationsecretsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Restoration Execution Id" },
					{ name: "Encryption Type" },
					{ name: "Order Number" },
					{ name: "Secret Value" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Restoration Execution Id", shown: true, realName: "restorationExecutionId" },
					{ name: "Encryption Type", shown: true, realName: "encryptionType" },
					{ name: "Order Number", shown: true, realName: "orderNumber" },
					{ name: "Secret Value", shown: true, realName: "secretValue" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
				],
				apiPath: "restoration-secret/secret",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableRestorationSecret): RestorationSecret {
		return {
			id: item.id,
			restorationExecutionId: item.restorationExecutionId,
			encryptionType: item.encryptionType,
			orderNumber: item.orderNumber,
			secretValue: item.secretValue,
			createdTime: "",
			updatedTime: "",
		};
	}
	public mapIncoming(item: RestorationSecret): TableRestorationSecret {
		return {
			id: item.id,
			restorationExecutionId: item.restorationExecutionId,
			encryptionType: item.encryptionType,
			orderNumber: item.orderNumber,
			secretValue: item.secretValue,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
		};
	}
	public getNewTableIdentifiable(): TableRestorationSecret {
		return {
			id: -1,
			restorationExecutionId: -1,
			encryptionType: "",
			orderNumber: -1,
			secretValue: "",
			createdTime: "",
			updatedTime: "",
		};
	}
}

interface TableRestorationSecret extends TableIdentifiable {
	id: number;
	restorationExecutionId: number;
	encryptionType: string;
	orderNumber: number;
	secretValue: string;
}

interface RestorationSecret extends IdentifiableDto {
	id: number;
	restorationExecutionId: number;
	encryptionType: string;
	orderNumber: number;
	secretValue: string;
}
