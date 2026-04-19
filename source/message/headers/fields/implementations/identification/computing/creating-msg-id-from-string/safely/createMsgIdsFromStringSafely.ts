import {
	createMsgIdFromStringSafely,
	type MsgId,
} from "../../../../../../msg-id/index.ts";
export function createMsgIdsFromStringSafely(
	string: string,
): null | readonly [MsgId, ...(readonly MsgId[])] {
	const regex: RegExp = /<[^<>]+>/gu;
	const msgIds: MsgId[] = [];
	for (;;) {
		const match: null | RegExpExecArray = regex.exec(string);
		if (match === null) {
			break;
		} else {
			const msgId: MsgId | null = createMsgIdFromStringSafely(match[0]);
			if (msgId === null) {
				return null;
			} else {
				msgIds.push(msgId);
				continue;
			}
		}
	}
	const [firstMsgId, ...restMsgIds] = msgIds;
	if (firstMsgId === undefined) {
		return null;
	} else {
		const tupleOfMsgIds: readonly [MsgId, ...(readonly MsgId[])] = [
			firstMsgId,
			...restMsgIds,
		];
		return tupleOfMsgIds;
	}
}
