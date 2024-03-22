import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RestorationSecretsOldDataPage } from "./restoration-secrets-old-data.page";

const routes: Routes = [
	{
		path: "",
		component: RestorationSecretsOldDataPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RestorationSecretsOldDataPageRoutingModule {}
