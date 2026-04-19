import {
	createMailboxFromStringSafely,
	type Mailbox,
} from "../../../mailbox/index.ts";
import {
	WithJustOneMailboxGroupList,
	WithMoreThanOneMailboxGroupList,
} from "../../implementations/index.ts";
import type {SupportedGroupList} from "../../supported/index.ts";
export function createGroupListFromStringSafely(
	string: string,
): null | SupportedGroupList {
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
			const mailboxList: WithJustOneMailboxGroupList =
				new WithJustOneMailboxGroupList(lastMailbox);
			return mailboxList;
		}
	} else {
		const lastMailbox: Mailbox | null =
			createMailboxFromStringSafely(mailboxAsString);
		if (lastMailbox === null) {
			return null;
		} else {
			const mailboxList: WithMoreThanOneMailboxGroupList =
				new WithMoreThanOneMailboxGroupList(
					firstMailbox,
					...restMailboxes,
					lastMailbox,
				);
			return mailboxList;
		}
	}
}
