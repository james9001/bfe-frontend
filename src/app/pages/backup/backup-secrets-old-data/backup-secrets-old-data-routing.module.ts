import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BackupSecretsOldDataPage } from "./backup-secrets-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: BackupSecretsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BackupSecretsOldDataPageRoutingModule {}
