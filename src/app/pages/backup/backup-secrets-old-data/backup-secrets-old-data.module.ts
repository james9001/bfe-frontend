import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BackupSecretsOldDataPageRoutingModule } from "./backup-secrets-old-data-routing.module";

import { BackupSecretsOldDataPage } from "./backup-secrets-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BackupSecretsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [BackupSecretsOldDataPage],
})
export class BackupSecretsOldDataPageModule {}
