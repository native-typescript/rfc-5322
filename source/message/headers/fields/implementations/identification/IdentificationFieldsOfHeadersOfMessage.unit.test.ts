import {HeaderOfMessage} from "../../../header/index.ts";
import {MsgId} from "../../../msg-id/index.ts";
import {IdentificationFieldsOfHeadersOfMessage} from "./IdentificationFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`IdentificationFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`headerify yields in-reply-to message-id references in order`, async function executeTest(): Promise<void> {
		const fields = new IdentificationFieldsOfHeadersOfMessage(
			[new MsgId(`inreply`, `example.com`)],
			new MsgId(`message`, `example.com`),
			[new MsgId(`ref`, `example.com`)],
		);
		expect(Array.from(fields.headerify())).toStrictEqual([
			new HeaderOfMessage(`In-Reply-To`, `<inreply@example.com>`),
			new HeaderOfMessage(`Message-ID`, `<message@example.com>`),
			new HeaderOfMessage(`References`, `<ref@example.com>`),
		]);
		return;
	});
	await test(`headerify skips null sections`, async function executeTest(): Promise<void> {
		const fields = new IdentificationFieldsOfHeadersOfMessage(null, null, null);
		expect(Array.from(fields.headerify())).toStrictEqual([]);
		return;
	});
});
