import {
	AddressList,
	AddrSpec,
	AngleAddr,
	WithDisplayNameNameAddr,
	WithJustOneMailboxMailboxList,
} from "../address-specification/index.ts";
import {OrigDate} from "../field/index.ts";
import {
	DestinationAddressFieldsOfHeadersOfMessage,
	EmptyTraceFieldsOfHeadersOfMessage,
	From,
	IdentificationFieldsOfHeadersOfMessage,
	InformationalFieldsOfHeadersOfMessage,
	MessageId,
	OptionalFieldsOfHeadersOfMessage,
	ResentFieldsOfHeadersOfMessage,
	Subject,
	To,
	WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
} from "../fields/index.ts";
import {HeaderOfMessage} from "../header/index.ts";
import {HeadersOfMessage} from "../HeadersOfMessage.ts";
import {MsgId} from "../msg-id/index.ts";
import {createHeadersOfMessageFromStringUnsafely} from "./createHeadersOfMessageFromString.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createHeadersOfMessageFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`parses required headers and optional headers`, async function executeTest(): Promise<void> {
		const headersString = `${[
			`Date: Wed, 2 Oct 2002 13:00:00 GMT`,
			`From: Alice <alice@example.com>`,
			`To: Bob <bob@example.com>`,
			`Subject: Test`,
			`Message-ID: <left@right>`,
			`X-Custom: CustomValue`,
		].join(`\r\n`)}\r\n`;
		const createdHeaders: HeadersOfMessage =
			createHeadersOfMessageFromStringUnsafely(headersString);
		const expectedHeaders: HeadersOfMessage = new HeadersOfMessage(
			new DestinationAddressFieldsOfHeadersOfMessage(
				null,
				null,
				new To(
					new AddressList(
						new WithDisplayNameNameAddr(
							`Bob`,
							new AngleAddr(new AddrSpec(`bob`, `example.com`)),
						),
					),
				),
			),
			new IdentificationFieldsOfHeadersOfMessage(
				null,
				new MessageId(new MsgId(`left`, `right`)),
				null,
			),
			new InformationalFieldsOfHeadersOfMessage(
				null,
				null,
				new Subject(`Test`),
			),
			new OptionalFieldsOfHeadersOfMessage(
				new HeaderOfMessage(`X-Custom`, `CustomValue`),
			),
			new OrigDate(new Date(`Wed, 2 Oct 2002 13:00:00 GMT`)),
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new WithDisplayNameNameAddr(
							`Alice`,
							new AngleAddr(new AddrSpec(`alice`, `example.com`)),
						),
					),
				),
				null,
				null,
			),
			new ResentFieldsOfHeadersOfMessage(),
			new EmptyTraceFieldsOfHeadersOfMessage(),
		);
		expect(createdHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	return;
});
