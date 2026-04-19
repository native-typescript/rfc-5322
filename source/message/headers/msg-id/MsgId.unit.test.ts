import {MsgId} from "./MsgId.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`MsgId`, async function executeTests(): Promise<void> {
	await test(`constructor assigns idLeft and idRight`, async function executeTest(): Promise<void> {
		const msgId: MsgId = new MsgId(`left`, `right`);
		expect(msgId.idLeft).toBe(`left`);
		expect(msgId.idRight).toBe(`right`);
		return;
	});
	await test(`equals returns true for same idLeft and idRight`, async function executeTest(): Promise<void> {
		const firstMsgId: MsgId = new MsgId(`left`, `right`);
		const secondMsgId: MsgId = new MsgId(`left`, `right`);
		expect(firstMsgId.equals(secondMsgId)).toBe(true);
		return;
	});
	await test(`equals returns false when idLeft differs`, async function executeTest(): Promise<void> {
		const firstMsgId: MsgId = new MsgId(`left`, `right`);
		const secondMsgId: MsgId = new MsgId(`other-left`, `right`);
		expect(firstMsgId.equals(secondMsgId)).toBe(false);
		return;
	});
	await test(`equals returns false when idRight differs`, async function executeTest(): Promise<void> {
		const firstMsgId: MsgId = new MsgId(`left`, `right`);
		const secondMsgId: MsgId = new MsgId(`left`, `other-right`);
		expect(firstMsgId.equals(secondMsgId)).toBe(false);
		return;
	});
	await test(`serialize returns RFC-5322 message-id format`, async function executeTest(): Promise<void> {
		const msgId: MsgId = new MsgId(`left`, `example.com`);
		expect(msgId.serialize()).toBe(`<left@example.com>`);
		return;
	});
	return;
});
