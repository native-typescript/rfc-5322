/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
import type {Serializable} from "../../../serializable/index.ts";
import type {AddrSpec, Mailbox} from "../address/index.ts";
import type {Stringifyable} from "../stringifyable/index.ts";
export class AngleAddr implements Serializable, Stringifyable {
	public constructor(addrSpec: AddrSpec) {
		this.addrSpec = addrSpec;
	}
	public readonly addrSpec: AddrSpec;
	public *iterateAddrSpecs(): Generator<AddrSpec, void, void> {
		yield this.addrSpec;
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox, void, void> {
		const mailboxes: Iterable<Mailbox> = this.addrSpec.iterateMailboxes();
		for (const mailbox of mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public serialize(): `<${string}>` {
		const serializedAddrSpecOfThis: string = this.addrSpec.serialize();
		const serializedThis: `<${string}>` = `<${serializedAddrSpecOfThis}>`;
		return serializedThis;
	}
	public stringify(): `<${string}>` {
		const stringifiedAddrSpecOfThis: string = this.addrSpec.stringify();
		const stringifiedThis: `<${string}>` = `<${stringifiedAddrSpecOfThis}>`;
		return stringifiedThis;
	}
}
