import type {HeaderOfMessage} from "../../../../header/index.ts";
import {
	createMsgIdFromStringUnsafely,
	type MsgId,
} from "../../../../msg-id/index.ts";
import {IdentificationFieldsOfHeadersOfMessage} from "../IdentificationFieldsOfHeadersOfMessage.ts";
import {InReplyTo} from "../in-reply-to/index.ts";
import {MessageId} from "../message-id/index.ts";
import {References} from "../references/index.ts";
import {createMsgIdsFromStringUnsafely} from "./creating-msg-id-from-string/index.ts";
export function computeIdentificationFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): IdentificationFieldsOfHeadersOfMessage {
	let inReplyTo: InReplyTo | null = null;
	let messageId: MessageId | null = null;
	let references: null | readonly [MsgId, ...(readonly MsgId[])] = null;
	for (const header of headers) {
		switch (header.name) {
			case `In-Reply-To`: {
				if (inReplyTo === null) {
					inReplyTo = new InReplyTo(
						...createMsgIdsFromStringUnsafely(header.value),
					);
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
					messageId = new MessageId(
						createMsgIdFromStringUnsafely(header.value),
					);
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
			references === null ? null : new References(...references),
		);
	return identificationFields;
}
