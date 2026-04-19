import type {SupportedMailboxList} from "../../supported/index.ts";
import {createMailboxListFromStringSafely} from "../safely/index.ts";
export function createMailboxListFromStringUnsafely(
	string: string,
): SupportedMailboxList {
	const mailboxList: null | SupportedMailboxList =
		createMailboxListFromStringSafely(string);
	if (mailboxList === null) {
		const error: Error = new Error(`Invalid mailbox-list format.`);
		throw error;
	} else {
		return mailboxList;
	}
}
