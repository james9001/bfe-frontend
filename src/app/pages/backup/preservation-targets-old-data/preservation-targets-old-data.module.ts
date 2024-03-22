import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PreservationTargetsOldDataPageRoutingModule } from "./preservation-targets-old-data-routing.module";

import { PreservationTargetsOldDataPage } from "./preservation-targets-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PreservationTargetsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [PreservationTargetsOldDataPage],
})
export class PreservationTargetsOldDataPageModule {}
