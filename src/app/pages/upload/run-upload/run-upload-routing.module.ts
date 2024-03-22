import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RunUploadPage } from "./run-upload.page";

const routes: Routes = [
	{
		path: "",
		component: RunUploadPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RunUploadPageRoutingModule {}
