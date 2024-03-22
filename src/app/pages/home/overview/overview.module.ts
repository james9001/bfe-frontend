import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TimeagoModule } from "ngx-timeago";

import { OverviewPageRoutingModule } from "./overview-routing.module";

import { OverviewPage } from "./overview.page";
import { FileSizePipe } from "src/app/filesize.pipe";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, OverviewPageRoutingModule, TimeagoModule],
	declarations: [OverviewPage, FileSizePipe],
})
export class OverviewPageModule {}
