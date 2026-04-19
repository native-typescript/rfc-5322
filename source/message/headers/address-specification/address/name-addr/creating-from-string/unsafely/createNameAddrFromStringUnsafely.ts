import type {NameAddr} from "../../NameAddr.ts";
import {createNameAddrFromStringSafely} from "../safely/index.ts";
export function createNameAddrFromStringUnsafely(string: string): NameAddr {
	const nameAddr: NameAddr | null = createNameAddrFromStringSafely(string);
	if (nameAddr === null) {
		const error: Error = new Error(`Invalid name-addr string.`);
		throw error;
	} else {
		return nameAddr;
	}
}
