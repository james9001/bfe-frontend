import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BackupExecutionsOldDataPageRoutingModule } from "./backup-executions-old-data-routing.module";

import { BackupExecutionsOldDataPage } from "./backup-executions-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BackupExecutionsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [BackupExecutionsOldDataPage],
})
export class BackupExecutionsOldDataPageModule {}
