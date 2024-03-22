import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CurrentUploadPageRoutingModule } from "./current-upload-routing.module";

import { CurrentUploadPage } from "./current-upload.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, CurrentUploadPageRoutingModule],
	declarations: [CurrentUploadPage],
})
export class CurrentUploadPageModule {}
