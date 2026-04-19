import {MsgId} from "../../../../../../msg-id/index.ts";
import {createMsgIdsFromStringUnsafely} from "./createMsgIdsFromStringUnsafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMsgIdsFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`throws for invalid list string`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMsgIds(): void {
			createMsgIdsFromStringUnsafely(`not-a-msg-id-list`);
		}).toThrow(`Invalid msg-id list string.`);
		return;
	});
	await test(`returns parsed message ids for valid input`, async function executeTest(): Promise<void> {
		expect(createMsgIdsFromStringUnsafely(`<left@example.com>`)).toStrictEqual([
			new MsgId(`left`, `example.com`),
		]);
		return;
	});
});
