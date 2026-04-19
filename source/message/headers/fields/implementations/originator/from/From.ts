import type {SupportedMailboxList} from "../../../../address-specification/index.ts";
import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.2
 */
export class From<
	MailboxListToUse extends SupportedMailboxList,
> implements FieldOfHeadersOfMessage {
	public constructor(mailboxList: MailboxListToUse) {
		this.mailboxList = mailboxList;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`From`,
			this.mailboxList.serialize(),
		);
		return header;
	}
	public readonly mailboxList: MailboxListToUse;
}
