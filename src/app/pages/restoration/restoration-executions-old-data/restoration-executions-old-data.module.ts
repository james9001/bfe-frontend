import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RestorationExecutionsOldDataPageRoutingModule } from "./restoration-executions-old-data-routing.module";

import { RestorationExecutionsOldDataPage } from "./restoration-executions-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RestorationExecutionsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [RestorationExecutionsOldDataPage],
})
export class RestorationExecutionsOldDataPageModule {}
