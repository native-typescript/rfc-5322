import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {MailboxList} from "../../MailboxList.ts";
import {typeOfWithJustOneMailboxMailboxList} from "./type/index.ts";
export class WithJustOneMailboxMailboxList implements MailboxList<
	typeof typeOfWithJustOneMailboxMailboxList
> {
	public constructor(mailbox: Mailbox) {
		this.mailbox = mailbox;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec> {
		const addrSpecs: Iterable<AddrSpec> = this.mailbox.iterateAddrSpecs();
		for (const addrSpec of addrSpecs) {
			yield addrSpec;
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox> {
		yield this.mailbox;
		return;
	}
	public readonly mailbox: Mailbox;
	public serialize(): string {
		const stringifiedMailboxList: string = this.mailbox.serialize();
		return stringifiedMailboxList;
	}
	public stringify(): string {
		const stringifiedMailboxList: string = this.mailbox.serialize();
		return stringifiedMailboxList;
	}
	public readonly type: typeof typeOfWithJustOneMailboxMailboxList =
		typeOfWithJustOneMailboxMailboxList;
}
