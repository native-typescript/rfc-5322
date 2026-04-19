import type {Mailbox} from "../mailbox/index.ts";
import type {Domain} from "./domain/index.ts";
import type {LocalPart} from "./local-part/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 */
export class AddrSpec implements Mailbox {
	public constructor(localPart: LocalPart, domain: Domain) {
		this.domain = domain;
		this.localPart = localPart;
	}
	public readonly domain: Domain;
	public equals(otherAddrSpec: AddrSpec): boolean {
		return (
			this.domain === otherAddrSpec.domain
			&& this.localPart === otherAddrSpec.localPart
		);
	}
	public extractAddrSpec(): this {
		return this;
	}
	public *iterateAddrSpecs(): Generator<this, void, void> {
		yield this;
		return;
	}
	public *iterateMailboxes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly localPart: LocalPart;
	public serialize(): `${string}@${string}` {
		const serializedThis: `${string}@${string}` = `${this.localPart}@${this.domain}`;
		return serializedThis;
	}
	public stringify(): `${string}@${string}` {
		const stringifiedThis: `${string}@${string}` = `${this.localPart}@${this.domain}`;
		return stringifiedThis;
	}
}
