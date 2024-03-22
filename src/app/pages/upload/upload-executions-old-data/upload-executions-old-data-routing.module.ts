import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UploadExecutionsOldDataPage } from "./upload-executions-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: UploadExecutionsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UploadExecutionsOldDataPageRoutingModule {}
