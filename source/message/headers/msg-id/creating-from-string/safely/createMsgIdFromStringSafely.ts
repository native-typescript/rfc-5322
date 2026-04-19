import type {IdLeft} from "../../id-left/index.ts";
import type {IdRight} from "../../id-right/index.ts";
import {MsgId} from "../../MsgId.ts";
export function createMsgIdFromStringSafely(string: string): MsgId | null {
	const match:
		| null
		| (RegExpExecArray & {
				readonly groups: {readonly idLeft: IdLeft; readonly idRight: IdRight};
				/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		  }) = /^<(?<idLeft>.+)@(?<idRight>.+)>$/u.exec(string) as
		| null
		| (RegExpExecArray & {
				readonly groups: {readonly idLeft: IdLeft; readonly idRight: IdRight};
		  });
	if (match === null) {
		return null;
	} else {
		const msgId: MsgId = new MsgId(match.groups.idLeft, match.groups.idRight);
		return msgId;
	}
}
