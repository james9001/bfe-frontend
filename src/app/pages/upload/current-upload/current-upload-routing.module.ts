import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CurrentUploadPage } from "./current-upload.page";

const routes: Routes = [
	{
		path: "",
		component: CurrentUploadPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CurrentUploadPageRoutingModule {}
