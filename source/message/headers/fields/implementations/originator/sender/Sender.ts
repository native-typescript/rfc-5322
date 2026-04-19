import type {Mailbox} from "../../../../address-specification/index.ts";
import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.2
 */
export class Sender<
	MailboxToUse extends Mailbox,
> implements FieldOfHeadersOfMessage {
	public constructor(mailbox: MailboxToUse) {
		this.mailbox = mailbox;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Sender`,
			this.mailbox.serialize(),
		);
		return header;
	}
	public readonly mailbox: MailboxToUse;
}
