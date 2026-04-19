import type {AddressList} from "../../AddressList.ts";
import {createAddressListFromStringSafely} from "../safely/index.ts";
export function createAddressListFromStringUnsafely(
	string: string,
): AddressList {
	const addressList: AddressList | null =
		createAddressListFromStringSafely(string);
	if (addressList === null) {
		const error: Error = new Error(`Invalid address-list format.`);
		throw error;
	} else {
		return addressList;
	}
}
