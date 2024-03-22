import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { QueuedBackupExecutionsOldDataPageRoutingModule } from "./queued-backup-executions-old-data-routing.module";

import { QueuedBackupExecutionsOldDataPage } from "./queued-backup-executions-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		QueuedBackupExecutionsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [QueuedBackupExecutionsOldDataPage],
})
export class QueuedBackupExecutionsOldDataPageModule {}
