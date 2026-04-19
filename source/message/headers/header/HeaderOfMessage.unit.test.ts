import {HeaderOfMessage} from "./HeaderOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`HeaderOfMessage`, async function executeTests(): Promise<void> {
	await test(`serialize returns header name and value`, async function executeTest(): Promise<void> {
		const header = new HeaderOfMessage(`Subject`, `Hello`);
		expect(header.serialize()).toBe(`Subject: Hello`);
		return;
	});
	return;
});
