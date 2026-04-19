import type {
	Mailbox,
	SupportedMailboxList,
} from "../../../address-specification/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {From} from "./from/index.ts";
import type {ReplyTo} from "./reply-to/index.ts";
import type {Sender} from "./sender/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.2
 */
export interface OriginatorFieldsOfHeadersOfMessage<
	FromToUse extends From<SupportedMailboxList>,
	SenderToUse extends null | Sender<Mailbox>,
> extends FieldsOfHeadersOfMessage {
	readonly from: FromToUse;
	readonly replyTo: null | ReplyTo;
	readonly sender: SenderToUse;
}
