import {MsgId} from "../../../../../../msg-id/index.ts";
import {createMsgIdsFromStringSafely} from "./createMsgIdsFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMsgIdsFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns null when no message id exists`, async function executeTest(): Promise<void> {
		expect(createMsgIdsFromStringSafely(`no-msg-id-here`)).toBeNull();
		return;
	});
	await test(`parses one or more message ids`, async function executeTest(): Promise<void> {
		expect(
			createMsgIdsFromStringSafely(`<left@example.com><right@example.com>`),
		).toStrictEqual([
			new MsgId(`left`, `example.com`),
			new MsgId(`right`, `example.com`),
		]);
		return;
	});
	await test(`returns null when extracted token is invalid msg-id`, async function executeTest(): Promise<void> {
		expect(createMsgIdsFromStringSafely(`<invalid>`)).toBeNull();
		return;
	});
});
