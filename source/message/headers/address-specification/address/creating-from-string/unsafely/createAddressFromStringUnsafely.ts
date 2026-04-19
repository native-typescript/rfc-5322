import type {Address} from "../../Address.ts";
import {createAddressFromStringSafely} from "../safely/index.ts";
export function createAddressFromStringUnsafely(string: string): Address {
	const address: Address | null = createAddressFromStringSafely(string);
	if (address === null) {
		const error: Error = new Error(`Invalid address string.`);
		throw error;
	} else {
		return address;
	}
}
