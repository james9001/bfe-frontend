import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RestorationSecretsOldDataPageRoutingModule } from "./restoration-secrets-old-data-routing.module";

import { RestorationSecretsOldDataPage } from "./restoration-secrets-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RestorationSecretsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [RestorationSecretsOldDataPage],
})
export class RestorationSecretsOldDataPageModule {}
