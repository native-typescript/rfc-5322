import type {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {InReplyTo} from "./in-reply-to/index.ts";
import type {MessageId} from "./message-id/index.ts";
import type {References} from "./references/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
 */
export class IdentificationFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(
		inReplyTo: InReplyTo | null,
		messageId: MessageId | null,
		references: null | References,
	) {
		this.inReplyTo = inReplyTo;
		this.messageId = messageId;
		this.references = references;
	}
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		if (this.inReplyTo !== null) {
			const header: HeaderOfMessage = this.inReplyTo.headerify();
			yield header;
		}
		if (this.messageId !== null) {
			const header: HeaderOfMessage = this.messageId.headerify();
			yield header;
		}
		if (this.references !== null) {
			const header: HeaderOfMessage = this.references.headerify();
			yield header;
		}
		return;
	}
	public readonly inReplyTo: InReplyTo | null;
	public readonly messageId: MessageId | null;
	public readonly references: null | References;
}
