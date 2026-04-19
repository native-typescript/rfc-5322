import type {AddrSpec} from "../../../addr-spec/index.ts";
import type {Mailbox} from "../../../mailbox/index.ts";
import type {MailboxList} from "../../MailboxList.ts";
import {typeOfWithMoreThanOneMailboxMailboxList} from "./type/index.ts";
export class WithMoreThanOneMailboxMailboxList implements MailboxList<
	typeof typeOfWithMoreThanOneMailboxMailboxList
> {
	public constructor(
		...mailboxes:
			| readonly [Mailbox, ...(readonly Mailbox[]), Mailbox]
			| readonly [Mailbox, Mailbox, ...(readonly Mailbox[])]
	) {
		this.mailboxes = mailboxes;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec> {
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
	public *iterateMailboxes(): Generator<Mailbox> {
		for (const mailbox of this.mailboxes) {
			yield mailbox;
			continue;
		}
		return;
	}
	public readonly mailboxes:
		| readonly [Mailbox, ...(readonly Mailbox[]), Mailbox]
		| readonly [Mailbox, Mailbox, ...(readonly Mailbox[])];
	public serialize(): string {
		const serializedThis: string = this.mailboxes
			.map<string>(function serializeMailbox(mailbox: Mailbox): string {
				const serializedMailbox: string = mailbox.serialize();
				return serializedMailbox;
			})
			.join(`,`);
		return serializedThis;
	}
	public stringify(): string {
		const stringifiedThis: string = this.mailboxes
			.map<string>(function stringifyMailbox(mailbox: Mailbox): string {
				const stringifiedMailbox: string = mailbox.stringify();
				return stringifiedMailbox;
			})
			.join(`,`);
		return stringifiedThis;
	}
	public readonly type: typeof typeOfWithMoreThanOneMailboxMailboxList =
		typeOfWithMoreThanOneMailboxMailboxList;
}
