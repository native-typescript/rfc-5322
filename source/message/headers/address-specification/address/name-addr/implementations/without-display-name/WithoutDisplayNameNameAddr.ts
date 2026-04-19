import type {AngleAddr} from "../../../../angle-addr/index.ts";
import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {NameAddr} from "../../NameAddr.ts";
export class WithoutDisplayNameNameAddr implements NameAddr {
	public constructor(angleAddr: AngleAddr) {
		this.angleAddr = angleAddr;
	}
	public readonly angleAddr: AngleAddr;
	public extractAddrSpec(): AddrSpec {
		return this.angleAddr.addrSpec;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec> {
		const addrSpecs: Iterable<AddrSpec> = this.angleAddr.iterateAddrSpecs();
		for (const addrSpec of addrSpecs) {
			yield addrSpec;
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox> {
		const mailboxes: Iterable<Mailbox> = this.angleAddr.iterateMailboxes();
		for (const mailbox of mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public serialize(): string {
		const serializedAngleAddrOfThis: string = this.angleAddr.serialize();
		const serializedThis: string = serializedAngleAddrOfThis;
		return serializedThis;
	}
	public stringify(): string {
		const stringifiedAngleAddrOfThis: string = this.angleAddr.stringify();
		const stringifiedThis: string = stringifiedAngleAddrOfThis;
		return stringifiedThis;
	}
}
