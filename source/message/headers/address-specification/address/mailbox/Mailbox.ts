import type {AddrSpec} from "../addr-spec/index.ts";
import type {Address} from "../Address.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
export interface Mailbox extends Address {
	extractAddrSpec(): AddrSpec;
}
