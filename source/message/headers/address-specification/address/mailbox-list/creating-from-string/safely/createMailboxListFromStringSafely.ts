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
	const mailboxesAsStrings: readonly string[] = string.split(`,`);
	const [firstMailboxAsString, ...restMailboxesAsStrings] = mailboxesAsStrings;
	if (firstMailboxAsString === undefined) {
		return null;
	} else {
		const firstMailbox: Mailbox | null =
			createMailboxFromStringSafely(firstMailboxAsString);
		if (firstMailbox === null) {
			return null;
		} else {
			const [secondMailboxAsString, ...restRestMailboxesAsStrings] =
				restMailboxesAsStrings;
			if (secondMailboxAsString === undefined) {
				const mailboxList: WithJustOneMailboxMailboxList =
					new WithJustOneMailboxMailboxList(firstMailbox);
				return mailboxList;
			} else {
				const secondMailbox: Mailbox | null = createMailboxFromStringSafely(
					secondMailboxAsString,
				);
				if (secondMailbox === null) {
					return null;
				} else {
					const restRestMailboxes: Mailbox[] = [];
					for (const restRestMailboxAsString of restRestMailboxesAsStrings) {
						const restRestMailbox: Mailbox | null =
							createMailboxFromStringSafely(restRestMailboxAsString);
						if (restRestMailbox === null) {
							return null;
						} else {
							restRestMailboxes.push(restRestMailbox);
							continue;
						}
					}
					const mailboxList: WithMoreThanOneMailboxMailboxList =
						new WithMoreThanOneMailboxMailboxList(
							firstMailbox,
							secondMailbox,
							...restRestMailboxes,
						);
					return mailboxList;
				}
			}
		}
	}
}
