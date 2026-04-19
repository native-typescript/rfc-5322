import {MsgId} from "../../MsgId.ts";
import {createMsgIdFromStringUnsafely} from "./createMsgIdFromStringUnsafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMsgIdFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMsgId(): void {
			createMsgIdFromStringUnsafely(`not-a-msg-id`);
		}).toThrow(`Invalid msg-id string.`);
		return;
	});
	await test(`returns MsgId for valid input`, async function executeTest(): Promise<void> {
		const createdMsgId: MsgId = createMsgIdFromStringUnsafely(`<left@right>`);
		const expectedMsgId: MsgId = new MsgId(`left`, `right`);
		expect(createdMsgId).toStrictEqual(expectedMsgId);
		return;
	});
	return;
});
