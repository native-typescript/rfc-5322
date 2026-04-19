import type {Serializable} from "../../../../serializable/index.ts";
import type {Stringifyable} from "../../stringifyable/index.ts";
import type {AddrSpec} from "../addr-spec/index.ts";
import type {Address} from "../Address.ts";
import type {Mailbox} from "../mailbox/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
 */
export class AddressList implements Serializable, Stringifyable {
	public constructor(
		...addresses: readonly [Address, ...(readonly Address[])]
	) {
		this.addresses = addresses;
	}
	public readonly addresses: readonly [Address, ...(readonly Address[])];
	public append(address: Address): AddressList {
		const addressesOfUpdatedThis: readonly [
			Address,
			...(readonly Address[]),
			Address,
		] = [...this.addresses, address];
		const updatedThis: AddressList = new AddressList(...addressesOfUpdatedThis);
		return updatedThis;
	}
	public *iterateAddrSpecs(): Generator<AddrSpec> {
		for (const address of this.addresses) {
			const addrSpecs: Iterable<AddrSpec> = address.iterateAddrSpecs();
			for (const addrSpec of addrSpecs) {
				yield addrSpec;
				continue;
			}
			continue;
		}
		return;
	}
	public *iterateMailboxes(): Generator<Mailbox> {
		for (const address of this.addresses) {
			const mailboxes: Iterable<Mailbox> = address.iterateMailboxes();
			for (const mailbox of mailboxes) {
				yield mailbox;
				continue;
			}
			continue;
		}
		return;
	}
	public serialize(): string {
		const stringifiedAdressList: string = this.addresses
			.map<string>(function serializeAddress(address: Address): string {
				const stringifiedAddress: string = address.serialize();
				return stringifiedAddress;
			})
			.join(`,`);
		return stringifiedAdressList;
	}
	public stringify(): string {
		const stringifiedAdressList: string = this.addresses
			.map<string>(function stringifyAddress(address: Address): string {
				const stringifiedAddress: string = address.stringify();
				return stringifiedAddress;
			})
			.join(`,`);
		return stringifiedAdressList;
	}
}
