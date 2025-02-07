import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PtAutocreatePageRoutingModule } from "./pt-autocreate-routing.module";

import { PtAutocreatePage } from "./pt-autocreate.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, PtAutocreatePageRoutingModule],
	declarations: [PtAutocreatePage],
})
export class PtAutocreatePageModule {}
