import {
	createMailboxFromStringSafely,
	type Mailbox,
} from "../../../mailbox/index.ts";
import {
	WithJustOneMailboxMailboxList,
	WithMoreThanOneMailboxMailboxList,
} from "../../implementations/index.ts";
import type {SupportedMailboxList} from "../../supported/index.ts";
export function createMailboxListFromStringSafely(
	string: string,
): null | SupportedMailboxList {
	let mailboxAsString: string = ``;
	const mailboxes: Mailbox[] = [];
	for (const character of string) {
		if (character === `,`) {
			const mailbox: Mailbox | null =
				createMailboxFromStringSafely(mailboxAsString);
			if (mailbox === null) {
				return null;
			} else {
				mailboxes.push(mailbox);
				mailboxAsString = ``;
				continue;
			}
		} else {
			mailboxAsString = `${mailboxAsString}${character}`;
			continue;
		}
	}
	const [firstMailbox, ...restMailboxes] = mailboxes;
	if (firstMailbox === undefined) {
		const lastMailbox: Mailbox | null =
			createMailboxFromStringSafely(mailboxAsString);
		if (lastMailbox === null) {
			return null;
		} else {
			const mailboxList: WithJustOneMailboxMailboxList =
				new WithJustOneMailboxMailboxList(lastMailbox);
			return mailboxList;
		}
	} else {
		const lastMailbox: Mailbox | null =
			createMailboxFromStringSafely(mailboxAsString);
		if (lastMailbox === null) {
			return null;
		} else {
			const mailboxList: WithMoreThanOneMailboxMailboxList =
				new WithMoreThanOneMailboxMailboxList(
					firstMailbox,
					...restMailboxes,
					lastMailbox,
				);
			return mailboxList;
		}
	}
}
