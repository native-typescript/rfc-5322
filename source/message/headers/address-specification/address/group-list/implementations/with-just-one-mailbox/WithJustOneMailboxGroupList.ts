import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {GroupList} from "../../GroupList.ts";
import {typeOfWithJustOneMailboxGroupList} from "./type/index.ts";
export class WithJustOneMailboxGroupList implements GroupList<
	typeof typeOfWithJustOneMailboxGroupList
> {
	public constructor(mailbox: Mailbox) {
		this.mailbox = mailbox;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec, void, void> {
		const addrSpecs: Iterable<AddrSpec> = this.mailbox.iterateAddrSpecs();
		for (const addrSpec of addrSpecs) {
			yield addrSpec;
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox, void, void> {
		yield this.mailbox;
		return;
	}
	public readonly mailbox: Mailbox;
	public serialize(): string {
		const stringifiedGroupList: string = this.mailbox.serialize();
		return stringifiedGroupList;
	}
	public stringify(): string {
		const stringifiedGroupList: string = this.mailbox.serialize();
		return stringifiedGroupList;
	}
	public readonly type: typeof typeOfWithJustOneMailboxGroupList =
		typeOfWithJustOneMailboxGroupList;
}
