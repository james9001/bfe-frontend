import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "home",
		loadChildren: () => import("./pages/home/home/home.module").then((m) => m.HomePageModule),
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "backup-executions-old-data",
		loadChildren: () =>
			import("./pages/backup/backup-executions-old-data/backup-executions-old-data.module").then(
				(m) => m.BackupExecutionsOldDataPageModule
			),
	},
	{
		path: "backup-secrets-old-data",
		loadChildren: () =>
			import("./pages/backup/backup-secrets-old-data/backup-secrets-old-data.module").then(
				(m) => m.BackupSecretsOldDataPageModule
			),
	},
	{
		path: "preservation-targets-old-data",
		loadChildren: () =>
			import("./pages/backup/preservation-targets-old-data/preservation-targets-old-data.module").then(
				(m) => m.PreservationTargetsOldDataPageModule
			),
	},
	{
		path: "restoration-executions-old-data",
		loadChildren: () =>
			import(
				"./pages/restoration/restoration-executions-old-data/restoration-executions-old-data.module"
			).then((m) => m.RestorationExecutionsOldDataPageModule),
	},
	{
		path: "restoration-secrets-old-data",
		loadChildren: () =>
			import(
				"./pages/restoration/restoration-secrets-old-data/restoration-secrets-old-data.module"
			).then((m) => m.RestorationSecretsOldDataPageModule),
	},
	{
		path: "upload-executions-old-data",
		loadChildren: () =>
			import("./pages/upload/upload-executions-old-data/upload-executions-old-data.module").then(
				(m) => m.UploadExecutionsOldDataPageModule
			),
	},
	{
		path: "run-backup",
		loadChildren: () =>
			import("./pages/backup/run-backup/run-backup.module").then((m) => m.RunBackupPageModule),
	},
	{
		path: "run-restoration",
		loadChildren: () =>
			import("./pages/restoration/run-restoration/run-restoration.module").then(
				(m) => m.RunRestorationPageModule
			),
	},
	{
		path: "run-upload",
		loadChildren: () =>
			import("./pages/upload/run-upload/run-upload.module").then((m) => m.RunUploadPageModule),
	},
	{
		path: "current-upload",
		loadChildren: () =>
			import("./pages/upload/current-upload/current-upload.module").then(
				(m) => m.CurrentUploadPageModule
			),
	},
	{
		path: "settings",
		loadChildren: () =>
			import("./pages/home/settings/settings.module").then((m) => m.SettingsPageModule),
	},
	{
		path: "queued-backup-executions-old-data",
		loadChildren: () =>
			import(
				"./pages/automation/queued-backup-executions-old-data/queued-backup-executions-old-data.module"
			).then((m) => m.QueuedBackupExecutionsOldDataPageModule),
	},
	{
		path: "run-batch",
		loadChildren: () =>
			import("./pages/automation/run-batch/run-batch.module").then((m) => m.RunBatchPageModule),
	},
	{
		path: "backup-executions-data",
		loadChildren: () =>
			import("./pages/backup/backup-executions-data/backup-executions-data.module").then(
				(m) => m.BackupExecutionsDataPageModule
			),
	},
	{
		path: "overview",
		loadChildren: () =>
			import("./pages/home/overview/overview.module").then((m) => m.OverviewPageModule),
	},
	{
		path: "backups",
		loadChildren: () =>
			import("./pages/home/backups/backups.module").then((m) => m.BackupsPageModule),
	},
	{
		path: "speed",
		loadChildren: () => import("./pages/home/speed/speed.module").then((m) => m.SpeedPageModule),
	},
	{
		path: "**",
		redirectTo: "home",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
