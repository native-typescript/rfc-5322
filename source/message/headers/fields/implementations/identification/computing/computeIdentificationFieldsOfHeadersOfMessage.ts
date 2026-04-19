import type {HeaderOfMessage} from "../../../../header/index.ts";
import {
	createMsgIdFromStringUnsafely,
	type MsgId,
} from "../../../../msg-id/index.ts";
import {IdentificationFieldsOfHeadersOfMessage} from "../IdentificationFieldsOfHeadersOfMessage.ts";
import {createMsgIdsFromStringUnsafely} from "./creating-msg-id-from-string/index.ts";
export function computeIdentificationFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): IdentificationFieldsOfHeadersOfMessage {
	let inReplyTo: null | readonly [MsgId, ...(readonly MsgId[])] = null;
	let messageId: MsgId | null = null;
	let references: null | readonly [MsgId, ...(readonly MsgId[])] = null;
	for (const header of headers) {
		switch (header.name) {
			case `In-Reply-To`: {
				if (inReplyTo === null) {
					inReplyTo = createMsgIdsFromStringUnsafely(header.value);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple In-Reply-To headers are not allowed.`,
					);
					throw error;
				}
			}
			case `Message-ID`: {
				if (messageId === null) {
					messageId = createMsgIdFromStringUnsafely(header.value);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Message-ID headers are not allowed.`,
					);
					throw error;
				}
			}
			case `References`: {
				if (references === null) {
					references = createMsgIdsFromStringUnsafely(header.value);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple References headers are not allowed.`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	const identificationFields: IdentificationFieldsOfHeadersOfMessage =
		new IdentificationFieldsOfHeadersOfMessage(
			inReplyTo,
			messageId,
			references,
		);
	return identificationFields;
}
