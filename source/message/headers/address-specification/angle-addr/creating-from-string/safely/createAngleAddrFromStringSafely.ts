import {
	type AddrSpec,
	createAddrSpecFromStringSafely,
} from "../../../address/index.ts";
import {AngleAddr} from "../../AngleAddr.ts";
export function createAngleAddrFromStringSafely(
	string: string,
): AngleAddr | null {
	const match:
		| null
		| (RegExpMatchArray & {readonly groups: {readonly addrSpec: string}}) =
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		/^<(?<addrSpec>[^<>]+)>$/u.exec(string) as
			| null
			| (RegExpMatchArray & {readonly groups: {readonly addrSpec: string}});
	if (match === null) {
		return null;
	} else {
		const addrSpec: AddrSpec | null = createAddrSpecFromStringSafely(
			match.groups.addrSpec,
		);
		if (addrSpec === null) {
			return null;
		} else {
			const angleAddr: AngleAddr = new AngleAddr(addrSpec);
			return angleAddr;
		}
	}
}
