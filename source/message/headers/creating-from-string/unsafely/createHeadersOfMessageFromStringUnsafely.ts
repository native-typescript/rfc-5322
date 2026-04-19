import {computeArrayOfHeadersOfMessage} from "../../computing-array-of-headers/index.ts";
import {computeOrigDate} from "../../field/index.ts";
import {
	computeDestinationAddressFieldsOfHeadersOfMessage,
	computeIdentificationFieldsOfHeadersOfMessage,
	computeInformationalFieldsOfHeadersOfMessage,
	computeOptionalFieldsOfHeadersOfMessage,
	computeOriginatorFieldsOfHeadersOfMessage,
	computeResentFieldsOfHeadersOfMessage,
	computeTraceFieldsOfHeadersOfMessage,
} from "../../fields/index.ts";
import type {HeaderOfMessage} from "../../header/index.ts";
import {HeadersOfMessage} from "../../HeadersOfMessage.ts";
export function createHeadersOfMessageFromStringUnsafely(
	string: string,
): HeadersOfMessage {
	const arrayOfHeaders: readonly HeaderOfMessage[] =
		computeArrayOfHeadersOfMessage(string);
	const headers: HeadersOfMessage = new HeadersOfMessage(
		computeDestinationAddressFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeIdentificationFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeInformationalFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeOptionalFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeOrigDate(arrayOfHeaders),
		computeOriginatorFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeResentFieldsOfHeadersOfMessage(arrayOfHeaders),
		computeTraceFieldsOfHeadersOfMessage(arrayOfHeaders),
	);
	return headers;
}
