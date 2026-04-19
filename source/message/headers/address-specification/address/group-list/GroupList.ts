/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
import type {Serializable} from "../../../../serializable/index.ts";
import type {Stringifyable} from "../../stringifyable/index.ts";
import type {AddrSpec} from "../addr-spec/index.ts";
import type {Mailbox} from "../mailbox/index.ts";
export interface GroupList<Type extends string>
	extends Serializable, Stringifyable {
	iterateAddrSpecs(): IteratorObject<AddrSpec, void, void>;
	iterateMailboxes(): IteratorObject<Mailbox, void, void>;
	readonly type: Type;
}
