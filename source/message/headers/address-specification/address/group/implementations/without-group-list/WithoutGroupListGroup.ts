import type {Group} from "../../Group.ts";
import rfc2047 from "rfc2047";
export class WithoutGroupListGroup implements Group {
	public constructor(displayName: string) {
		this.displayName = displayName;
	}
	public readonly displayName: string;
	public *iterateAddrSpecs(): Generator<never, void, void> {
		return;
	}
	public *iterateMailboxes(): Generator<never, void, void> {
		return;
	}
	public serialize(): `${string}:;` {
		const serializedDisplayNameOfThis: string = rfc2047.encode(
			this.displayName,
		);
		const serializedThis: `${string}:;` = `${serializedDisplayNameOfThis}:;`;
		return serializedThis;
	}
	public stringify(): `${string}:;` {
		const stringifiedThis: `${string}:;` = `${this.displayName}:;`;
		return stringifiedThis;
	}
}
