import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {GroupList} from "../../GroupList.ts";
import {typeOfWithMoreThanOneMailboxGroupList} from "./type/index.ts";
export class WithMoreThanOneMailboxGroupList implements GroupList<
	typeof typeOfWithMoreThanOneMailboxGroupList
> {
	public constructor(
		...mailboxes: readonly [Mailbox, ...(readonly Mailbox[]), Mailbox]
	) {
		this.mailboxes = mailboxes;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec, void, void> {
		for (const mailbox of this.mailboxes) {
			const addrSpecs: Iterable<AddrSpec> = mailbox.iterateAddrSpecs();
			for (const addrSpec of addrSpecs) {
				yield addrSpec;
				continue;
			}
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox, void, void> {
		for (const mailbox of this.mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public readonly mailboxes: readonly [
		Mailbox,
		...(readonly Mailbox[]),
		Mailbox,
	];
	public serialize(): string {
		const stringifiedMailboxesOfThisGroupList: string = this.mailboxes
			.map<string>(function serializeMailbox(mailbox: Mailbox): string {
				const stringifiedMailbox: string = mailbox.serialize();
				return stringifiedMailbox;
			})
			.join(`,`);
		const stringifiedGroupList: string = stringifiedMailboxesOfThisGroupList;
		return stringifiedGroupList;
	}
	public stringify(): string {
		const stringifiedMailboxesOfThisGroupList: string = this.mailboxes
			.map<string>(function stringifyMailbox(mailbox: Mailbox): string {
				const stringifiedMailbox: string = mailbox.stringify();
				return stringifiedMailbox;
			})
			.join(`,`);
		const stringifiedGroupList: string = stringifiedMailboxesOfThisGroupList;
		return stringifiedGroupList;
	}
	public readonly type: typeof typeOfWithMoreThanOneMailboxGroupList =
		typeOfWithMoreThanOneMailboxGroupList;
}
