import { Injectable, PipeTransform, Pipe } from "@angular/core";

type unit = "bytes" | "KB" | "MB" | "GB" | "TB" | "PB";
type unitPrecisionMap = {
	[u in unit]: number;
};

@Pipe({
	name: "filesize",
})
@Injectable()
export class FileSizePipe implements PipeTransform {
	private readonly units: unit[] = ["bytes", "KB", "MB", "GB", "TB", "PB"];

	public readonly defaultPrecisionMap: unitPrecisionMap = {
		bytes: 0,
		KB: 0,
		MB: 1,
		GB: 1,
		TB: 2,
		PB: 2,
	};

	public transform(value: number): string {
		if (isNaN(parseFloat(String(value))) || !isFinite(value)) return "?";

		let unitIndex = 0;

		while (value >= 1024) {
			value /= 1024;
			unitIndex++;
		}

		const unit = this.units[unitIndex];

		return `${value.toFixed(this.defaultPrecisionMap[unit])} ${unit}`;
	}
}
