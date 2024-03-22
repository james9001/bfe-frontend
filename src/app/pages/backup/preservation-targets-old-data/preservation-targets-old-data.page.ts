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
	selector: "app-preservation-targets",
	templateUrl: "./preservation-targets-old-data.page.html",
	styleUrls: ["./preservation-targets-old-data.page.scss"],
})
export class PreservationTargetsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "preservationtargetsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Name" },
					{ name: "Type" },
					{ name: "Full Path" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
					{ name: "Priority Label" },
					{ name: "Category" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Name", shown: true, realName: "name" },
					{ name: "Type", shown: true, realName: "type" },
					{ name: "Full Path", shown: true, realName: "fullPath" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
					{ name: "Priority Label", shown: true, realName: "priorityLabel" },
					{ name: "Category", shown: true, realName: "category" },
				],
				apiPath: "preservation-target/target",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TablePreservationTarget): PreservationTarget {
		return {
			id: item.id,
			type: item.type,
			fullPath: item.fullPath,
			createdTime: "",
			updatedTime: "",
			priorityLabel: item.priorityLabel,
			category: item.category,
			name: item.name,
		};
	}
	public mapIncoming(item: PreservationTarget): TablePreservationTarget {
		return {
			id: item.id,
			type: item.type,
			fullPath: item.fullPath,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
			priorityLabel: item.priorityLabel,
			category: item.category,
			name: item.name,
		};
	}
	public getNewTableIdentifiable(): TablePreservationTarget {
		return {
			id: -1,
			type: "",
			fullPath: "",
			createdTime: "",
			updatedTime: "",
			priorityLabel: "",
			category: "",
			name: "",
		};
	}
}

interface TablePreservationTarget extends TableIdentifiable {
	id: number;
	type: string;
	fullPath: string;
	priorityLabel: string;
	category: string;
	name: string;
}

export interface PreservationTarget extends IdentifiableDto {
	id: number;
	type: string;
	fullPath: string;
	priorityLabel: string;
	category: string;
	name: string;
}
