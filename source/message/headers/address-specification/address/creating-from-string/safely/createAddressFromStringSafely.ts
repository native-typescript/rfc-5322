import type {Address} from "../../Address.ts";
import {createGroupFromStringSafely, type Group} from "../../group/index.ts";
import {
	createMailboxFromStringSafely,
	type Mailbox,
} from "../../mailbox/index.ts";
export function createAddressFromStringSafely(string: string): Address | null {
	const group: Group | null = createGroupFromStringSafely(string);
	if (group === null) {
		const mailbox: Mailbox | null = createMailboxFromStringSafely(string);
		if (mailbox === null) {
			return null;
		} else {
			return mailbox;
		}
	} else {
		return group;
	}
}
