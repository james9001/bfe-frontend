import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RunBackupPage } from "./run-backup.page";

const routes: Routes = [
	{
		path: "",
		component: RunBackupPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RunBackupPageRoutingModule {}
