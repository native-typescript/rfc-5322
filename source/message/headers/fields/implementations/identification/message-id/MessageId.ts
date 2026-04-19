import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
import type {MsgId} from "../../../../msg-id/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
 */
export class MessageId implements FieldOfHeadersOfMessage {
	public constructor(msgId: MsgId) {
		this.msgId = msgId;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Message-ID`,
			this.msgId.serialize(),
		);
		return header;
	}
	public readonly msgId: MsgId;
}
