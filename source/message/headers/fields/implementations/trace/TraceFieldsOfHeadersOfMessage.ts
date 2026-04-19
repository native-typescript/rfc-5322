import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {Received, Return} from "./implementations/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.7
 */
export interface TraceFieldsOfHeadersOfMessage<
	ReceivedsToUse extends null | readonly [Received, ...(readonly Received[])],
	ReturnToUse extends null | Return,
	TypeToUse extends string,
> extends FieldsOfHeadersOfMessage {
	readonly receiveds: ReceivedsToUse;
	readonly return_: ReturnToUse;
	readonly type: TypeToUse;
}
