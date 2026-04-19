import {HeaderOfMessage} from "../../../header/index.ts";
import type {MsgId} from "../../../msg-id/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
 */
export class IdentificationFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(
		inReplyTo: null | readonly [MsgId, ...(readonly MsgId[])],
		messageId: MsgId | null,
		references: null | readonly [MsgId, ...(readonly MsgId[])],
	) {
		this.inReplyTo = inReplyTo;
		this.messageId = messageId;
		this.references = references;
	}
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		if (this.inReplyTo !== null) {
			const header: HeaderOfMessage = new HeaderOfMessage(
				`In-Reply-To`,
				this.inReplyTo
					.map<string>(function serializeMsgId(msgId: MsgId): string {
						const serializedMsgId: string = msgId.serialize();
						return serializedMsgId;
					})
					.join(``),
			);
			yield header;
		}
		if (this.messageId !== null) {
			const header: HeaderOfMessage = new HeaderOfMessage(
				`Message-ID`,
				this.messageId.serialize(),
			);
			yield header;
		}
		if (this.references !== null) {
			const header: HeaderOfMessage = new HeaderOfMessage(
				`References`,
				this.references
					.map<string>(function serializeMsgId(msgId: MsgId): string {
						const serializedMsgId: string = msgId.serialize();
						return serializedMsgId;
					})
					.join(``),
			);
			yield header;
		}
		return;
	}
	public readonly inReplyTo: null | readonly [MsgId, ...(readonly MsgId[])];
	public readonly messageId: MsgId | null;
	public readonly references: null | readonly [MsgId, ...(readonly MsgId[])];
}
