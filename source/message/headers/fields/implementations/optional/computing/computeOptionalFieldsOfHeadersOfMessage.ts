import type {HeaderOfMessage} from "../../../../header/index.ts";
import {OptionalFieldsOfHeadersOfMessage} from "../OptionalFieldsOfHeadersOfMessage.ts";
export function computeOptionalFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): OptionalFieldsOfHeadersOfMessage {
	const optionalHeaders: HeaderOfMessage[] = [];
	for (const header of headers) {
		switch (header.name) {
			case `Bcc`:
			case `Cc`:
			case `Comments`:
			case `Date`:
			case `From`:
			case `In-Reply-To`:
			case `Keywords`:
			case `Message-ID`:
			case `Received`:
			case `References`:
			case `Reply-To`:
			case `Resent-Bcc`:
			case `Resent-Cc`:
			case `Resent-Date`:
			case `Resent-From`:
			case `Resent-Message-ID`:
			case `Resent-Reply-To`:
			case `Resent-Sender`:
			case `Resent-To`:
			case `Return-Path`:
			case `Sender`:
			case `Subject`:
			case `To`: {
				continue;
			}
			default: {
				optionalHeaders.push(header);
				continue;
			}
		}
	}
	const computedOptionalFields: OptionalFieldsOfHeadersOfMessage =
		new OptionalFieldsOfHeadersOfMessage(...optionalHeaders);
	return computedOptionalFields;
}
