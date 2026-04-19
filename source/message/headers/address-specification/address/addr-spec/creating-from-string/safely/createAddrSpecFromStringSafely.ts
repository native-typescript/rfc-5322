import {AddrSpec} from "../../AddrSpec.ts";
export function createAddrSpecFromStringSafely(
	string: string,
): AddrSpec | null {
	const match:
		| null
		| (RegExpMatchArray & {
				readonly groups: {readonly domain: string; readonly localPart: string};
				/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		  }) = /^(?<localPart>[^@]+)@(?<domain>[^@]+)$/u.exec(string) as
		| null
		| (RegExpMatchArray & {
				readonly groups: {readonly domain: string; readonly localPart: string};
		  });
	if (match === null) {
		return null;
	} else {
		const addrSpec: AddrSpec = new AddrSpec(
			match.groups.localPart,
			match.groups.domain,
		);
		return addrSpec;
	}
}
