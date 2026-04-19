import type {HeaderOfMessage} from "../../../../../header/index.ts";
import type {TraceFieldsOfHeadersOfMessage} from "../../TraceFieldsOfHeadersOfMessage.ts";
import type {Received} from "./received/index.ts";
import type {Return} from "./return/index.ts";
import {typeOfNonEmptyTraceFieldsOfHeadersOfMessage} from "./type/index.ts";
export class NonEmptyTraceFieldsOfHeadersOfMessage implements TraceFieldsOfHeadersOfMessage<
	readonly [Received, ...(readonly Received[])],
	null | Return,
	typeof typeOfNonEmptyTraceFieldsOfHeadersOfMessage
> {
	public constructor(
		return_: null | Return,
		receiveds: readonly [Received, ...(readonly Received[])],
	) {
		this.receiveds = receiveds;
		this.return_ = return_;
	}
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		if (this.return_ !== null) {
			const header: HeaderOfMessage = this.return_.headerify();
			yield header;
		}
		for (const received of this.receiveds) {
			const header: HeaderOfMessage = received.headerify();
			yield header;
			continue;
		}
		return;
	}
	public readonly receiveds: readonly [Received, ...(readonly Received[])];
	public readonly return_: null | Return;
	public readonly type: typeof typeOfNonEmptyTraceFieldsOfHeadersOfMessage =
		typeOfNonEmptyTraceFieldsOfHeadersOfMessage;
}
