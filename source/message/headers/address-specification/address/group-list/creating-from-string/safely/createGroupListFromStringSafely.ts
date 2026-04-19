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
				const groupList: WithJustOneMailboxGroupList =
					new WithJustOneMailboxGroupList(firstMailbox);
				return groupList;
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
					const groupList: WithMoreThanOneMailboxGroupList =
						new WithMoreThanOneMailboxGroupList(
							firstMailbox,
							secondMailbox,
							...restRestMailboxes,
						);
					return groupList;
				}
			}
		}
	}
}
