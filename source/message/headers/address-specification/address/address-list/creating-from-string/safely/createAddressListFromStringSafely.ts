import type {Address} from "../../../Address.ts";
import {createAddressFromStringSafely} from "../../../creating-from-string/index.ts";
import {AddressList} from "../../AddressList.ts";
export function createAddressListFromStringSafely(
	string: string,
): AddressList | null {
	const addressesAsStrings: readonly string[] =
		string === `` ? [] : string.split(`,`);
	const [firstAddressAsString, ...restAddressesAsStrings] = addressesAsStrings;
	if (firstAddressAsString === undefined) {
		return null;
	} else {
		const firstAddress: Address | null =
			createAddressFromStringSafely(firstAddressAsString);
		if (firstAddress === null) {
			return null;
		} else {
			const restAddresses: Address[] = [];
			for (const restAddressAsString of restAddressesAsStrings) {
				const restAddress: Address | null =
					createAddressFromStringSafely(restAddressAsString);
				if (restAddress === null) {
					return null;
				} else {
					restAddresses.push(restAddress);
					continue;
				}
			}
			const addressList: AddressList = new AddressList(
				firstAddress,
				...restAddresses,
			);
			return addressList;
		}
	}
}
