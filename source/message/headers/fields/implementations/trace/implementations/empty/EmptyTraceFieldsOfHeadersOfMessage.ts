import type {HeaderOfMessage} from "../../../../../header/index.ts";
import type {TraceFieldsOfHeadersOfMessage} from "../../TraceFieldsOfHeadersOfMessage.ts";
import {typeOfEmptyTraceFieldsOfHeadersOfMessage} from "./type/index.ts";
export class EmptyTraceFieldsOfHeadersOfMessage implements TraceFieldsOfHeadersOfMessage<
	null,
	null,
	typeof typeOfEmptyTraceFieldsOfHeadersOfMessage
> {
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		return;
	}
	public readonly receiveds: null = null;
	public readonly return_: null = null;
	public readonly type: typeof typeOfEmptyTraceFieldsOfHeadersOfMessage =
		typeOfEmptyTraceFieldsOfHeadersOfMessage;
}
