import type {DateTime} from "../../DateTime.ts";
import {createDateTimeFromStringSafely} from "../safely/index.ts";
export function createDateTimeFromStringUnsafely(string: string): DateTime {
	const dateTime: DateTime | null = createDateTimeFromStringSafely(string);
	if (dateTime === null) {
		const error: Error = new Error(`Invalid date-time string.`);
		throw error;
	} else {
		return dateTime;
	}
}
