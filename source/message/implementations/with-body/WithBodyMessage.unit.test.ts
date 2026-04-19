import {
	AddrSpec,
	DestinationAddressFieldsOfHeadersOfMessage,
	EmptyTraceFieldsOfHeadersOfMessage,
	From,
	HeadersOfMessage,
	IdentificationFieldsOfHeadersOfMessage,
	InformationalFieldsOfHeadersOfMessage,
	OptionalFieldsOfHeadersOfMessage,
	OrigDate,
	ResentFieldsOfHeadersOfMessage,
	WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
	WithJustOneMailboxMailboxList,
} from "../../headers/index.ts";
import {WithBodyMessage} from "./WithBodyMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithBodyMessage`, async function executeTests(): Promise<void> {
	await test(`serialize joins headers and body with CRLF`, async function executeTest(): Promise<void> {
		const headers: HeadersOfMessage = new HeadersOfMessage(
			new DestinationAddressFieldsOfHeadersOfMessage(null, null, null),
			new IdentificationFieldsOfHeadersOfMessage(null, null, null),
			new InformationalFieldsOfHeadersOfMessage(null, null, null),
			new OptionalFieldsOfHeadersOfMessage(),
			new OrigDate(new Date(`Wed, 2 Oct 2002 13:00:00 GMT`)),
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new AddrSpec(`alice`, `example.com`),
					),
				),
				null,
				null,
			),
			new ResentFieldsOfHeadersOfMessage(),
			new EmptyTraceFieldsOfHeadersOfMessage(),
		);
		const message: WithBodyMessage = new WithBodyMessage(headers, `Body`);
		const expectedString = `${headers.serialize()}\r\nBody`;
		expect(message.serialize()).toBe(expectedString);
		return;
	});
	return;
});
