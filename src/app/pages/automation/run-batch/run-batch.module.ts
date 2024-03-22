import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RunBatchPageRoutingModule } from "./run-batch-routing.module";

import { RunBatchPage } from "./run-batch.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RunBatchPageRoutingModule],
	declarations: [RunBatchPage],
})
export class RunBatchPageModule {}
