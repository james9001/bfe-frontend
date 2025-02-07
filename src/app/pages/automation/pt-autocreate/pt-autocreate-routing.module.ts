import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PtAutocreatePage } from "./pt-autocreate.page";

const routes: Routes = [
	{
		path: "",
		component: PtAutocreatePage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PtAutocreatePageRoutingModule {}
