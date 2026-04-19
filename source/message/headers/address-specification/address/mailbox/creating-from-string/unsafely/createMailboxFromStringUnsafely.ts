import type {Mailbox} from "../../Mailbox.ts";
import {createMailboxFromStringSafely} from "../safely/index.ts";
export function createMailboxFromStringUnsafely(string: string): Mailbox {
	const mailbox: Mailbox | null = createMailboxFromStringSafely(string);
	if (mailbox === null) {
		const error: Error = new Error(`Invalid mailbox string.`);
		throw error;
	} else {
		return mailbox;
	}
}
