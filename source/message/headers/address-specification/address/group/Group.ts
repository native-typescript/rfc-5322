/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
import type {Address} from "../Address.ts";
export interface Group extends Address {
	readonly displayName: string;
}
