import type {
	AddressList,
	Mailbox,
	SupportedMailboxList,
} from "../../../../address-specification/index.ts";
import type {MsgId} from "../../../../msg-id/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../../FieldsOfHeadersOfMessage.ts";
export interface BlockOfResentFieldsOfHeadersOfMessage<
	FromToUse extends SupportedMailboxList,
	SenderToUse extends Mailbox | null,
> extends FieldsOfHeadersOfMessage {
	readonly bcc: AddressList | null;
	readonly cc: AddressList | null;
	readonly date: Date;
	readonly from: FromToUse;
	readonly messageId: MsgId | null;
	readonly sender: SenderToUse;
	readonly to: AddressList | null;
}
