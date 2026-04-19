/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
import type {AngleAddr} from "../../angle-addr/index.ts";
import type {Mailbox} from "../mailbox/index.ts";
export interface NameAddr extends Mailbox {
	readonly angleAddr: AngleAddr;
}
