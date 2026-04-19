import {
	type AddressList,
	createAddressListFromStringUnsafely,
	createMailboxFromStringUnsafely,
	createMailboxListFromStringUnsafely,
	type Mailbox,
	typeOfWithJustOneMailboxMailboxList,
	typeOfWithMoreThanOneMailboxMailboxList,
	type WithJustOneMailboxMailboxList,
	type WithMoreThanOneMailboxMailboxList,
} from "../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../header/index.ts";
import {From} from "../from/index.ts";
import {
	WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
	WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
} from "../implementations/index.ts";
import {ReplyTo} from "../reply-to/index.ts";
import {Sender} from "../sender/index.ts";
import type {SupportedOriginatorFieldsOfHeadersOfMessage} from "../supported/index.ts";
export function computeOriginatorFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): SupportedOriginatorFieldsOfHeadersOfMessage {
	let from: From<
		WithJustOneMailboxMailboxList | WithMoreThanOneMailboxMailboxList
	> | null = null;
	let replyTo: null | ReplyTo = null;
	let sender: null | Sender<Mailbox> = null;
	for (const header of headers) {
		switch (header.name) {
			case `From`: {
				if (from === null) {
					const mailboxList:
						| WithJustOneMailboxMailboxList
						| WithMoreThanOneMailboxMailboxList =
						createMailboxListFromStringUnsafely(header.value);
					from = new From(mailboxList);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple From headers are not allowed`,
					);
					throw error;
				}
			}
			case `Reply-To`: {
				if (replyTo === null) {
					const replyToAddressList: AddressList =
						createAddressListFromStringUnsafely(header.value);
					replyTo = new ReplyTo(replyToAddressList);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Reply-To headers are not allowed`,
					);
					throw error;
				}
			}
			case `Sender`: {
				if (sender === null) {
					const senderMailbox: Mailbox = createMailboxFromStringUnsafely(
						header.value,
					);
					sender = new Sender(senderMailbox);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Sender headers are not allowed`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	if (from === null) {
		const error: Error = new Error(`From header is missing`);
		throw error;
	} else {
		switch (from.mailboxList.type) {
			case typeOfWithMoreThanOneMailboxMailboxList: {
				if (sender === null) {
					const error: Error = new Error(
						`Sender header is required when there are multiple From addresses.`,
					);
					throw error;
				} else {
					const fromWithMoreThanOneMailboxInFrom: From<WithMoreThanOneMailboxMailboxList> =
						new From(from.mailboxList);
					const originatorFields: WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage =
						new WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
							fromWithMoreThanOneMailboxInFrom,
							replyTo,
							sender,
						);
					return originatorFields;
				}
			}
			case typeOfWithJustOneMailboxMailboxList: {
				const fromWithJustOneMailboxInFrom: From<WithJustOneMailboxMailboxList> =
					new From(from.mailboxList);
				const originatorFields: WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage =
					new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
						fromWithJustOneMailboxInFrom,
						replyTo,
						sender,
					);
				return originatorFields;
			}
		}
	}
}
