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
import {WithoutBodyMessage} from "./WithoutBodyMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithoutBodyMessage`, async function executeTests(): Promise<void> {
	await test(`constructor assigns headers`, async function executeTest(): Promise<void> {
		const headersOfMessage: HeadersOfMessage = new HeadersOfMessage(
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
		const message: WithoutBodyMessage = new WithoutBodyMessage(
			headersOfMessage,
		);
		expect(message.headers).toBe(headersOfMessage);
		return;
	});
	await test(`serialize returns headers with trailing CRLF`, async function executeTest(): Promise<void> {
		const headersOfMessage: HeadersOfMessage = new HeadersOfMessage(
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
		const message: WithoutBodyMessage = new WithoutBodyMessage(
			headersOfMessage,
		);
		const expectedSerializedMessage =
			`${headersOfMessage.serialize()}\r\n` as const satisfies string;
		const actualSerializedMessage: `${string}\r\n` = message.serialize();
		expect(actualSerializedMessage).toBe(expectedSerializedMessage);
		return;
	});
	return;
});
