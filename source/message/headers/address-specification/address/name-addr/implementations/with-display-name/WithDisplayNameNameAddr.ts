import type {AngleAddr} from "../../../../angle-addr/index.ts";
import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {NameAddr} from "../../NameAddr.ts";
import rfc2047 from "rfc2047";
export class WithDisplayNameNameAddr implements NameAddr {
	public constructor(displayName: string, angleAddr: AngleAddr) {
		this.angleAddr = angleAddr;
		this.displayName = displayName;
	}
	public readonly angleAddr: AngleAddr;
	public readonly displayName: string;
	public extractAddrSpec(): AddrSpec {
		return this.angleAddr.addrSpec;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec, void, void> {
		const addrSpecs: Iterable<AddrSpec, void, void> =
			this.angleAddr.iterateAddrSpecs();
		for (const addrSpec of addrSpecs) {
			yield addrSpec;
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox, void, void> {
		const mailboxes: Iterable<Mailbox, void, void> =
			this.angleAddr.iterateMailboxes();
		for (const mailbox of mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public serialize(): string {
		const serializedDisplayNameOfThis: string = rfc2047.encode(
			this.displayName,
		);
		const serializedAngleAddrOfThis: string = this.angleAddr.serialize();
		const serializedThis: string = `${serializedDisplayNameOfThis}${serializedAngleAddrOfThis}`;
		return serializedThis;
	}
	public stringify(): string {
		const stringifiedAngleAddrOfThis: string = this.angleAddr.stringify();
		const stringifiedThis: string = `${this.displayName}${stringifiedAngleAddrOfThis}`;
		return stringifiedThis;
	}
}
