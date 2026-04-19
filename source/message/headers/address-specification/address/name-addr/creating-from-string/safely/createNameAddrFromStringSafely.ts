import {
	type AngleAddr,
	createAngleAddrFromStringSafely,
} from "../../../../angle-addr/index.ts";
import {
	WithDisplayNameNameAddr,
	WithoutDisplayNameNameAddr,
} from "../../implementations/index.ts";
import type {NameAddr} from "../../NameAddr.ts";
import rfc2047 from "rfc2047";
export function createNameAddrFromStringSafely(
	string: string,
): NameAddr | null {
	const match:
		| null
		| (RegExpMatchArray & {
				readonly groups: {
					readonly angleAddr: string;
					readonly displayName: string | undefined;
				};
				/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		  }) = /^(?<displayName>[^<]+)?(?<angleAddr><.*)$/u.exec(string) as
		| null
		| (RegExpMatchArray & {
				readonly groups: {
					readonly angleAddr: string;
					readonly displayName: string | undefined;
				};
		  });
	if (match === null) {
		return null;
	} else {
		const angleAddr: AngleAddr | null = createAngleAddrFromStringSafely(
			match.groups.angleAddr,
		);
		if (angleAddr === null) {
			return null;
		} else {
			if (match.groups.displayName === undefined) {
				const nameAddr: NameAddr = new WithoutDisplayNameNameAddr(angleAddr);
				return nameAddr;
			} else {
				const nameAddr: NameAddr = new WithDisplayNameNameAddr(
					rfc2047.decode(match.groups.displayName.trim()),
					angleAddr,
				);
				return nameAddr;
			}
		}
	}
}
