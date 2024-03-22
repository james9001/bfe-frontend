import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BackupExecutionsOldDataPage } from "./backup-executions-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: BackupExecutionsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BackupExecutionsOldDataPageRoutingModule {}
