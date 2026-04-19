import type {AddressList} from "../../../../address-specification/index.ts";
import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.3
 */
export class Bcc implements FieldOfHeadersOfMessage {
	public constructor(addressList: AddressList) {
		this.addressList = addressList;
	}
	public readonly addressList: AddressList;
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Bcc`,
			this.addressList.serialize(),
		);
		return header;
	}
}
