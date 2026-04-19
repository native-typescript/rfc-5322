import {createDateTimeFromStringUnsafely} from "../../../../date-time/index.ts";
import type {HeaderOfMessage} from "../../../../header/index.ts";
import {OrigDate} from "../OrigDate.ts";
export function computeOrigDate(
	headers: Iterable<HeaderOfMessage, void, void>,
): OrigDate {
	let origDate: null | OrigDate = null;
	for (const header of headers) {
		switch (header.name) {
			case `Date`: {
				if (origDate === null) {
					const valueOfOrigDate: Date = createDateTimeFromStringUnsafely(
						header.value,
					);
					origDate = new OrigDate(valueOfOrigDate);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Date headers are not allowed.`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	if (origDate === null) {
		const error: Error = new Error(`A Date header is required.`);
		throw error;
	} else {
		return origDate;
	}
}
