import {
	type AddressList,
	createAddressListFromStringUnsafely,
	createMailboxFromStringUnsafely,
	createMailboxListFromStringUnsafely,
	type Mailbox,
	type SupportedMailboxList,
	typeOfWithMoreThanOneMailboxMailboxList,
} from "../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../header/index.ts";
import {
	createMsgIdFromStringUnsafely,
	type MsgId,
} from "../../../../msg-id/index.ts";
import {
	type SupportedBlockOfResentFieldsOfHeadersOfMessage,
	WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage,
	WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage,
} from "../block/index.ts";
import {ResentFieldsOfHeadersOfMessage} from "../ResentFieldsOfHeadersOfMessage.ts";
export function computeResentFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): ResentFieldsOfHeadersOfMessage {
	const blocks: SupportedBlockOfResentFieldsOfHeadersOfMessage[] = [];
	let hasCurrentBlock: boolean = false;
	let currentBcc: AddressList | null = null;
	let currentCc: AddressList | null = null;
	let currentDate: Date | null = null;
	let currentFrom: null | SupportedMailboxList = null;
	let currentMessageId: MsgId | null = null;
	let currentSender: Mailbox | null = null;
	let currentTo: AddressList | null = null;
	for (const header of headers) {
		switch (header.name) {
			case `Resent-Date`: {
				if (hasCurrentBlock) {
					if (currentDate === null) {
						const error: Error = new Error(
							`A Resent-Date header is missing in resent block.`,
						);
						throw error;
					}
					if (currentFrom === null) {
						const error: Error = new Error(
							`A Resent-From header is missing in resent block.`,
						);
						throw error;
					}
					if (currentFrom.type === typeOfWithMoreThanOneMailboxMailboxList) {
						if (currentSender === null) {
							const error: Error = new Error(
								`A Resent-Sender header is required when there are multiple Resent-From addresses.`,
							);
							throw error;
						} else {
							const block: WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage =
								new WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
									currentDate,
									currentFrom,
									currentMessageId,
									currentSender,
									currentTo,
									currentCc,
									currentBcc,
								);
							blocks.push(block);
						}
					} else {
						const block: WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage =
							new WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
								currentDate,
								currentFrom,
								currentMessageId,
								currentSender,
								currentTo,
								currentCc,
								currentBcc,
							);
						blocks.push(block);
					}
					currentBcc = null;
					currentCc = null;
					currentFrom = null;
					currentMessageId = null;
					currentSender = null;
					currentTo = null;
				}
				currentDate = new Date(header.value);
				hasCurrentBlock = true;
				continue;
			}
			case `Resent-From`: {
				if (currentFrom === null) {
					currentFrom = createMailboxListFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-From headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			case `Resent-Sender`: {
				if (currentSender === null) {
					currentSender = createMailboxFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-Sender headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			case `Resent-To`: {
				if (currentTo === null) {
					currentTo = createAddressListFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-To headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			case `Resent-Cc`: {
				if (currentCc === null) {
					currentCc = createAddressListFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-Cc headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			case `Resent-Bcc`: {
				if (currentBcc === null) {
					currentBcc = createAddressListFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-Bcc headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			case `Resent-Message-ID`: {
				if (currentMessageId === null) {
					currentMessageId = createMsgIdFromStringUnsafely(header.value);
					hasCurrentBlock = true;
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Resent-Message-ID headers are not allowed in a resent block.`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	if (hasCurrentBlock) {
		if (currentDate === null) {
			const error: Error = new Error(
				`A Resent-Date header is missing in resent block.`,
			);
			throw error;
		}
		if (currentFrom === null) {
			const error: Error = new Error(
				`A Resent-From header is missing in resent block.`,
			);
			throw error;
		}
		if (currentFrom.type === typeOfWithMoreThanOneMailboxMailboxList) {
			if (currentSender === null) {
				const error: Error = new Error(
					`A Resent-Sender header is required when there are multiple Resent-From addresses.`,
				);
				throw error;
			} else {
				const block: WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage =
					new WithMoreThanOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
						currentDate,
						currentFrom,
						currentMessageId,
						currentSender,
						currentTo,
						currentCc,
						currentBcc,
					);
				blocks.push(block);
			}
		} else {
			const block: WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage =
				new WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
					currentDate,
					currentFrom,
					currentMessageId,
					currentSender,
					currentTo,
					currentCc,
					currentBcc,
				);
			blocks.push(block);
		}
	}
	const resentFields: ResentFieldsOfHeadersOfMessage =
		new ResentFieldsOfHeadersOfMessage(...blocks);
	return resentFields;
}
