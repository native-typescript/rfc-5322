import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
import type {MsgId} from "../../../../msg-id/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
 */
export class InReplyTo implements FieldOfHeadersOfMessage {
	public constructor(...msgIds: readonly [MsgId, ...(readonly MsgId[])]) {
		this.msgIds = msgIds;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`In-Reply-To`,
			this.msgIds
				.map<string>(function serializeMsgId(msgId: MsgId): string {
					const serializedMsgId: string = msgId.serialize();
					return serializedMsgId;
				})
				.join(``),
		);
		return header;
	}
	public readonly msgIds: readonly [MsgId, ...(readonly MsgId[])];
}
