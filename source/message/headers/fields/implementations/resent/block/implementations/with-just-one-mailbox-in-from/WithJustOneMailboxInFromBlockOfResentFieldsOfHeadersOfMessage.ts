import type {
	AddressList,
	Mailbox,
	WithJustOneMailboxMailboxList,
} from "../../../../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../../../../header/index.ts";
import type {MsgId} from "../../../../../../msg-id/index.ts";
import type {BlockOfResentFieldsOfHeadersOfMessage} from "../../BlockOfResentFieldsOfHeadersOfMessage.ts";
export class WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage implements BlockOfResentFieldsOfHeadersOfMessage<
	WithJustOneMailboxMailboxList,
	Mailbox | null
> {
	public constructor(
		date: Date,
		from: WithJustOneMailboxMailboxList,
		messageId: MsgId | null,
		sender: Mailbox | null,
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
	public readonly from: WithJustOneMailboxMailboxList;
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
		if (this.bcc !== null) {
			const resentBccHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Bcc`,
				this.bcc.serialize(),
			);
			yield resentBccHeader;
		}
		if (this.cc !== null) {
			const resentCcHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Cc`,
				this.cc.serialize(),
			);
			yield resentCcHeader;
		}
		if (this.messageId !== null) {
			const resentMessageIdHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Message-ID`,
				this.messageId.serialize(),
			);
			yield resentMessageIdHeader;
		}
		if (this.sender !== null) {
			const resentSenderHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-Sender`,
				this.sender.serialize(),
			);
			yield resentSenderHeader;
		}
		if (this.to !== null) {
			const resentToHeader: HeaderOfMessage = new HeaderOfMessage(
				`Resent-To`,
				this.to.serialize(),
			);
			yield resentToHeader;
		}
		return;
	}
	public readonly messageId: MsgId | null;
	public readonly sender: Mailbox | null;
	public readonly to: AddressList | null;
}
