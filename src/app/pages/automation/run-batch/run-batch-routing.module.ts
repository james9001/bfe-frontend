import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RunBatchPage } from "./run-batch.page";

const routes: Routes = [
	{
		path: "",
		component: RunBatchPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RunBatchPageRoutingModule {}
