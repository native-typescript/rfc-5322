import type {AngleAddr} from "../../AngleAddr.ts";
import {createAngleAddrFromStringSafely} from "../safely/index.ts";
export function createAngleAddrFromStringUnsafely(string: string): AngleAddr {
	const angleAddr: AngleAddr | null = createAngleAddrFromStringSafely(string);
	if (angleAddr === null) {
		const error: Error = new Error(`Invalid angle-addr string.`);
		throw error;
	} else {
		return angleAddr;
	}
}
