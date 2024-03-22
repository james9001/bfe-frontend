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
import { DirectoryChecksum } from "../../backup/backup-executions-old-data/backup-executions-old-data.page";

@Component({
	selector: "app-restoration-executions",
	templateUrl: "./restoration-executions-old-data.page.html",
	styleUrls: ["./restoration-executions-old-data.page.scss"],
})
export class RestorationExecutionsOldDataPage extends AbstractListingPage {
	public createState(): PageState {
		return {
			allModels: [],
			currentModels: [],
			dataTableConfiguration: {
				pageSize: 20,
				storagePersistenceKey: "restorationexecutionsolddata",
				columns: [
					{ name: "Id" },
					{ name: "Source Dir" },
					{ name: "Destination Dir" },
					{ name: "Preservation Target Revealed" },
					{ name: "Category" },
					{ name: "Checksum" },
					{ name: "Created Time" },
					{ name: "Updated Time" },
				],
				availableColumns: [
					{ name: "Id", shown: true, realName: "id" },
					{ name: "Source Dir", shown: true, realName: "sourceDir" },
					{ name: "Destination Dir", shown: true, realName: "destinationDir" },
					{ name: "Preservation Target Revealed", shown: true, realName: "preservationTargetRevealed" },
					{ name: "Category", shown: true, realName: "category" },
					{ name: "Checksum", shown: true, realName: "checksum" },
					{ name: "Created Time", shown: true, realName: "createdTime" },
					{ name: "Updated Time", shown: true, realName: "updatedTime" },
				],
				apiPath: "restoration/execution",
			},
			isTableHidden: true,
			pageComponent: this,
		};
	}

	public mapOutgoing(item: TableRestorationExecution): RestorationExecution {
		return {
			id: item.id,
			sourceDir: item.sourceDir,
			destinationDir: item.destinationDir,
			preservationTargetRevealed: item.preservationTargetRevealed,
			category: item.category,
			checksum: { checksumValue: item.checksum },
			createdTime: "",
			updatedTime: "",
		};
	}
	public mapIncoming(item: RestorationExecution): TableRestorationExecution {
		return {
			id: item.id,
			sourceDir: item.sourceDir,
			destinationDir: item.destinationDir,
			preservationTargetRevealed: item.preservationTargetRevealed,
			category: item.category,
			checksum: item.checksum.checksumValue,
			createdTime: formatDate(item.createdTime, "yyyy-MM-dd h:mm a", "en-US"),
			updatedTime: formatDate(item.updatedTime, "yyyy-MM-dd h:mm a", "en-US"),
		};
	}
	public getNewTableIdentifiable(): TableRestorationExecution {
		return {
			id: -1,
			sourceDir: "",
			destinationDir: "",
			preservationTargetRevealed: "",
			category: "",
			checksum: "",
			createdTime: "",
			updatedTime: "",
		};
	}
}

interface TableRestorationExecution extends TableIdentifiable {
	id: number;
	sourceDir: string;
	destinationDir: string;
	preservationTargetRevealed: string;
	category: string;
	checksum: string;
}

interface RestorationExecution extends IdentifiableDto {
	id: number;
	sourceDir: string;
	destinationDir: string;
	preservationTargetRevealed: string;
	category: string;
	checksum: DirectoryChecksum;
}
