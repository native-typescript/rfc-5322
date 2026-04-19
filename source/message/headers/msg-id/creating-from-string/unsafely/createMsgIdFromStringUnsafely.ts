import type {MsgId} from "../../MsgId.ts";
import {createMsgIdFromStringSafely} from "../safely/index.ts";
export function createMsgIdFromStringUnsafely(string: string): MsgId {
	const msgId: MsgId | null = createMsgIdFromStringSafely(string);
	if (msgId === null) {
		const error: Error = new Error(`Invalid msg-id string.`);
		throw error;
	} else {
		return msgId;
	}
}
