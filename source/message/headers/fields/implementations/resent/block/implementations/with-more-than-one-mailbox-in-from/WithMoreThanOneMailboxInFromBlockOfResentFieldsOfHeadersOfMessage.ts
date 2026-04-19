import type {
	AddressList,
	Mailbox,
	WithMoreThanOneMailboxMailboxList,
} from "../../../../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../../../../header/index.ts";
import type {MsgId} from "../../../../../../msg-id/index.ts";
import type {BlockOfResentFieldsOfHeadersOfMessage} from "../../BlockOfResentFieldsOfHeadersOfMessage.ts";
export class WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage implements BlockOfResentFieldsOfHeadersOfMessage<
	WithMoreThanOneMailboxMailboxList,
	Mailbox
> {
	public constructor(
		date: Date,
		from: WithMoreThanOneMailboxMailboxList,
		messageId: MsgId | null,
		sender: Mailbox,
		to: AddressList | null,
		cc: AddressList | null,
		bcc: AddressList | null,
	) {
		this.date = date;
		this.from = from;
		this.messageId = messageId;
		this.sender = sender;
		this.to = to;
		this.cc = cc;
		this.bcc = bcc;
	}
	public readonly bcc: AddressList | null;
	public readonly cc: AddressList | null;
	public readonly date: Date;
	public readonly from: WithMoreThanOneMailboxMailboxList;
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		const resentDateHeader: HeaderOfMessage = new HeaderOfMessage(
			`Resent-Date`,
			this.date.toUTCString(),
		);
		yield resentDateHeader;
		const resentFromHeader: HeaderOfMessage = new HeaderOfMessage(
			`Resent-From`,
			this.from.serialize(),
		);
		yield resentFromHeader;
		const resentSenderHeader: HeaderOfMessage = new HeaderOfMessage(
			`Resent-Sender`,
			this.sender.serialize(),
		);
		yield resentSenderHeader;
		if (this.to !== null) {
			const resentToHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-To`,
				this.to.serialize(),
			);
			yield resentToHeader;
		}
		if (this.cc !== null) {
			const resentCcHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Cc`,
				this.cc.serialize(),
			);
			yield resentCcHeader;
		}
		if (this.bcc !== null) {
			const resentBccHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Bcc`,
				this.bcc.serialize(),
			);
			yield resentBccHeader;
		}
		if (this.messageId !== null) {
			const resentMessageIdHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Message-ID`,
				this.messageId.serialize(),
			);
			yield resentMessageIdHeader;
		}
		return;
	}
	public readonly messageId: MsgId | null;
	public readonly sender: Mailbox;
	public readonly to: AddressList | null;
}
