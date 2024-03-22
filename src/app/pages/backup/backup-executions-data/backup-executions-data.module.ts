import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BackupExecutionsDataPageRoutingModule } from "./backup-executions-data-routing.module";

import { BackupExecutionsDataPage } from "./backup-executions-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BackupExecutionsDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [BackupExecutionsDataPage],
})
export class BackupExecutionsDataPageModule {}
