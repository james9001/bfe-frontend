import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { RunRestorationPageRoutingModule } from "./run-restoration-routing.module";
import { RunRestorationPage } from "./run-restoration.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RunRestorationPageRoutingModule],
	declarations: [RunRestorationPage],
})
export class RunRestorationPageModule {}
