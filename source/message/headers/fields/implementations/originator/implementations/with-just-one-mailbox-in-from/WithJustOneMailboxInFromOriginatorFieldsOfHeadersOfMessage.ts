import type {
	Mailbox,
	WithJustOneMailboxMailboxList,
} from "../../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../../header/index.ts";
import type {From} from "../../from/index.ts";
import type {OriginatorFieldsOfHeadersOfMessage} from "../../OriginatorFieldsOfHeadersOfMessage.ts";
import type {ReplyTo} from "../../reply-to/index.ts";
import type {Sender} from "../../sender/index.ts";
export class WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage implements OriginatorFieldsOfHeadersOfMessage<
	From<WithJustOneMailboxMailboxList>,
	null | Sender<Mailbox>
> {
	public constructor(
		from: From<WithJustOneMailboxMailboxList>,
		replyTo: null | ReplyTo,
		sender: null | Sender<Mailbox>,
	) {
		this.from = from;
		this.replyTo = replyTo;
		this.sender = sender;
	}
	public readonly from: From<WithJustOneMailboxMailboxList>;
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		const fromHeader: HeaderOfMessage = this.from.headerify();
		yield fromHeader;
		if (this.replyTo !== null) {
			const replyToHeader: HeaderOfMessage = this.replyTo.headerify();
			yield replyToHeader;
		}
		if (this.sender !== null) {
			const senderHeader: HeaderOfMessage = this.sender.headerify();
			yield senderHeader;
		}
		return;
	}
	public readonly replyTo: null | ReplyTo;
	public readonly sender: null | Sender<Mailbox>;
}
