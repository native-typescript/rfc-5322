import type {
	Mailbox,
	WithMoreThanOneMailboxMailboxList,
} from "../../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../../header/index.ts";
import type {From} from "../../from/index.ts";
import type {OriginatorFieldsOfHeadersOfMessage} from "../../OriginatorFieldsOfHeadersOfMessage.ts";
import type {ReplyTo} from "../../reply-to/index.ts";
import type {Sender} from "../../sender/index.ts";
export class WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage implements OriginatorFieldsOfHeadersOfMessage<
	From<WithMoreThanOneMailboxMailboxList>,
	Sender<Mailbox>
> {
	public constructor(
		from: From<WithMoreThanOneMailboxMailboxList>,
		replyTo: null | ReplyTo,
		sender: Sender<Mailbox>,
	) {
		this.from = from;
		this.replyTo = replyTo;
		this.sender = sender;
	}
	public readonly from: From<WithMoreThanOneMailboxMailboxList>;
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		const fromHeader: HeaderOfMessage = this.from.headerify();
		yield fromHeader;
		if (this.replyTo !== null) {
			const replyToHeader: HeaderOfMessage = this.replyTo.headerify();
			yield replyToHeader;
		}
		const senderHeader: HeaderOfMessage = this.sender.headerify();
		yield senderHeader;
		return;
	}
	public readonly replyTo: null | ReplyTo;
	public readonly sender: Sender<Mailbox>;
}
