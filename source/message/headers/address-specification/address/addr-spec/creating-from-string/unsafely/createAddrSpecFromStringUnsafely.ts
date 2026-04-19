import type {AddrSpec} from "../../AddrSpec.ts";
import {createAddrSpecFromStringSafely} from "../safely/index.ts";
export function createAddrSpecFromStringUnsafely(string: string): AddrSpec {
	const addrSpec: AddrSpec | null = createAddrSpecFromStringSafely(string);
	if (addrSpec === null) {
		const error: Error = new Error(`Invalid addr-spec string.`);
		throw error;
	} else {
		return addrSpec;
	}
}
