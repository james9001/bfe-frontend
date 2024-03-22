import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RunUploadPageRoutingModule } from "./run-upload-routing.module";

import { RunUploadPage } from "./run-upload.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RunUploadPageRoutingModule],
	declarations: [RunUploadPage],
})
export class RunUploadPageModule {}
