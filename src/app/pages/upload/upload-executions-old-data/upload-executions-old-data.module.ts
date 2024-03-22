import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UploadExecutionsOldDataPageRoutingModule } from "./upload-executions-old-data-routing.module";

import { UploadExecutionsOldDataPage } from "./upload-executions-old-data.page";
import { GenericDataTableModule } from "src/app/components/shared/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UploadExecutionsOldDataPageRoutingModule,
		GenericDataTableModule,
	],
	declarations: [UploadExecutionsOldDataPage],
})
export class UploadExecutionsOldDataPageModule {}
