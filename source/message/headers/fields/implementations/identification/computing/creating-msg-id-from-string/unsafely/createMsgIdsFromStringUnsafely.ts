import type {MsgId} from "../../../../../../msg-id/index.ts";
import {createMsgIdsFromStringSafely} from "../safely/index.ts";
export function createMsgIdsFromStringUnsafely(
	string: string,
): readonly [MsgId, ...(readonly MsgId[])] {
	const msgIds: null | readonly [MsgId, ...(readonly MsgId[])] =
		createMsgIdsFromStringSafely(string);
	if (msgIds === null) {
		const error: Error = new Error(`Invalid msg-id list string.`);
		throw error;
	} else {
		return msgIds;
	}
}
