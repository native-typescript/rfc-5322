import {
	type AddrSpec,
	createAddrSpecFromStringSafely,
} from "../../../addr-spec/index.ts";
import {
	createNameAddrFromStringSafely,
	type NameAddr,
} from "../../../name-addr/index.ts";
import type {Mailbox} from "../../Mailbox.ts";
export function createMailboxFromStringSafely(string: string): Mailbox | null {
	const nameAddr: NameAddr | null = createNameAddrFromStringSafely(string);
	if (nameAddr === null) {
		const addrSpec: AddrSpec | null = createAddrSpecFromStringSafely(string);
		if (addrSpec === null) {
			return null;
		} else {
			return addrSpec;
		}
	} else {
		return nameAddr;
	}
}
