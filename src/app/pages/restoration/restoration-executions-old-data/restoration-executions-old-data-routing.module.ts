import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RestorationExecutionsOldDataPage } from "./restoration-executions-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: RestorationExecutionsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RestorationExecutionsOldDataPageRoutingModule {}
