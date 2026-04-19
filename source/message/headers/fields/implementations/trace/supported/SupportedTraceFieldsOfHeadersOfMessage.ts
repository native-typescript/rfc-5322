import type {
	EmptyTraceFieldsOfHeadersOfMessage,
	NonEmptyTraceFieldsOfHeadersOfMessage,
} from "../implementations/index.ts";
export type SupportedTraceFieldsOfHeadersOfMessage =
	| EmptyTraceFieldsOfHeadersOfMessage
	| NonEmptyTraceFieldsOfHeadersOfMessage;
