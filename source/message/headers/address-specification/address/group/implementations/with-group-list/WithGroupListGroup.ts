import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {SupportedGroupList} from "../../../group-list/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {Group} from "../../Group.ts";
import rfc2047 from "rfc2047";
export class WithGroupListGroup implements Group {
	public constructor(displayName: string, groupList: SupportedGroupList) {
		this.displayName = displayName;
		this.groupList = groupList;
	}
	public readonly displayName: string;
	public readonly groupList: SupportedGroupList;
	public *iterateAddrSpecs(): Generator<AddrSpec, void, void> {
		const addrSpecs: Iterable<AddrSpec, void, void> =
			this.groupList.iterateAddrSpecs();
		for (const addrSpec of addrSpecs) {
			yield addrSpec;
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox, void, void> {
		const mailboxes: Iterable<Mailbox, void, void> =
			this.groupList.iterateMailboxes();
		for (const mailbox of mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public serialize(): `${string}:${string};` {
		const serializedDisplayNameOfThis: string = rfc2047.encode(
			this.displayName,
		);
		const serializedGroupListOfThis: string = this.groupList.serialize();
		const serializedGroup: `${string}:${string};` = `${serializedDisplayNameOfThis}:${serializedGroupListOfThis};`;
		return serializedGroup;
	}
	public stringify(): `${string}:${string};` {
		const stringifiedGroupListOfThis: string = this.groupList.stringify();
		const stringifiedThis: `${string}:${string};` = `${this.displayName}:${stringifiedGroupListOfThis};`;
		return stringifiedThis;
	}
}
