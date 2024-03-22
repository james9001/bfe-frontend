import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { QueuedBackupExecutionsOldDataPage } from "./queued-backup-executions-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: QueuedBackupExecutionsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class QueuedBackupExecutionsOldDataPageRoutingModule {}
