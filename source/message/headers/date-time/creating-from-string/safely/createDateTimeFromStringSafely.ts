import type {DateTime} from "../../DateTime.ts";
export function createDateTimeFromStringSafely(
	string: string,
): DateTime | null {
	const dateTime: Date = new Date(string);
	const unixTimestampOfDateTimeInMilliseconds: number = dateTime.getTime();
	const isInvalidDateTime: boolean = Number.isNaN(
		unixTimestampOfDateTimeInMilliseconds,
	);
	if (isInvalidDateTime) {
		return null;
	} else {
		return dateTime;
	}
}
