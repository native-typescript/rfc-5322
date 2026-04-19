import {
	type AddressList,
	createAddressListFromStringUnsafely,
} from "../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../header/index.ts";
import {Bcc} from "../bcc/index.ts";
import {Cc} from "../cc/index.ts";
import {DestinationAddressFieldsOfHeadersOfMessage} from "../DestinationAddressFieldsOfHeadersOfMessage.ts";
import {To} from "../to/index.ts";
export function computeDestinationAddressFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): DestinationAddressFieldsOfHeadersOfMessage {
	let bcc: Bcc | null = null;
	let cc: Cc | null = null;
	let to: null | To = null;
	for (const header of headers) {
		switch (header.name) {
			case `Bcc`: {
				if (bcc === null) {
					const addressListOfBcc: AddressList =
						createAddressListFromStringUnsafely(header.value);
					bcc = new Bcc(addressListOfBcc);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Bcc headers are not allowed.`,
					);
					throw error;
				}
			}
			case `Cc`: {
				if (cc === null) {
					const addressListOfCc: AddressList =
						createAddressListFromStringUnsafely(header.value);
					cc = new Cc(addressListOfCc);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Cc headers are not allowed.`,
					);
					throw error;
				}
			}
			case `To`: {
				if (to === null) {
					const addressListOfTo: AddressList =
						createAddressListFromStringUnsafely(header.value);
					to = new To(addressListOfTo);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple To headers are not allowed.`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	const destinationAddressFields: DestinationAddressFieldsOfHeadersOfMessage =
		new DestinationAddressFieldsOfHeadersOfMessage(bcc, cc, to);
	return destinationAddressFields;
}
