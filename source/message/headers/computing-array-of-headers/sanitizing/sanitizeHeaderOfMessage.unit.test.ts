import {HeaderOfMessage} from "../../header/index.ts";
import {sanitizeHeaderOfMessage} from "./sanitizeHeaderOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`sanitizeHeaderOfMessage`, async function executeTests(): Promise<void> {
	await test(`collapses whitespace in header value`, async function executeTest(): Promise<void> {
		const header = new HeaderOfMessage(`Subject`, `  hello\t\tworld   `);
		const sanitized = sanitizeHeaderOfMessage(header);
		expect(sanitized).toStrictEqual(
			new HeaderOfMessage(`Subject`, `hello world`),
		);
		return;
	});
	return;
});
