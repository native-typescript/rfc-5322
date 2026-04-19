import {
	AddressList,
	AddrSpec,
	type Mailbox,
	WithJustOneMailboxMailboxList,
	WithMoreThanOneMailboxMailboxList,
} from "../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../header/index.ts";
import {From} from "./from/index.ts";
import {
	WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
	WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
} from "./implementations/index.ts";
import {ReplyTo} from "./reply-to/index.ts";
import {Sender} from "./sender/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`originator field wrappers`, async function executeTests(): Promise<void> {
	await test(`From ReplyTo Sender headerify correctly`, async function executeTest(): Promise<void> {
		expect(
			new From(
				new WithJustOneMailboxMailboxList(new AddrSpec(`from`, `example.com`)),
			).headerify(),
		).toStrictEqual(new HeaderOfMessage(`From`, `from@example.com`));
		expect(
			new ReplyTo(
				new AddressList(new AddrSpec(`reply`, `example.com`)),
			).headerify(),
		).toStrictEqual(new HeaderOfMessage(`Reply-To`, `reply@example.com`));
		expect(
			new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)).headerify(),
		).toStrictEqual(new HeaderOfMessage(`Sender`, `sender@example.com`));
		return;
	});
	await test(`WithJustOneMailbox... headerify yields from then optional reply-to and sender`, async function executeTest(): Promise<void> {
		const fields =
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new AddrSpec(`from`, `example.com`),
					),
				),
				new ReplyTo(new AddressList(new AddrSpec(`reply`, `example.com`))),
				new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)),
			);
		expect(Array.from(fields.headerify())).toStrictEqual([
			new HeaderOfMessage(`From`, `from@example.com`),
			new HeaderOfMessage(`Reply-To`, `reply@example.com`),
			new HeaderOfMessage(`Sender`, `sender@example.com`),
		]);
		return;
	});
	await test(`WithMoreThanOneMailbox... headerify always yields sender`, async function executeTest(): Promise<void> {
		const fields =
			new WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithMoreThanOneMailboxMailboxList(
						new AddrSpec(`from1`, `example.com`),
						new AddrSpec(`from2`, `example.com`),
					),
				),
				null,
				new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)),
			);
		expect(Array.from(fields.headerify())).toStrictEqual([
			new HeaderOfMessage(`From`, `from1@example.com,from2@example.com`),
			new HeaderOfMessage(`Sender`, `sender@example.com`),
		]);
		return;
	});
	await test(`WithMoreThanOneMailbox... includes reply-to when provided`, async function executeTest(): Promise<void> {
		const fields =
			new WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithMoreThanOneMailboxMailboxList(
						new AddrSpec(`from1`, `example.com`),
						new AddrSpec(`from2`, `example.com`),
					),
				),
				new ReplyTo(new AddressList(new AddrSpec(`reply`, `example.com`))),
				new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)),
			);
		expect(Array.from(fields.headerify())).toStrictEqual([
			new HeaderOfMessage(`From`, `from1@example.com,from2@example.com`),
			new HeaderOfMessage(`Reply-To`, `reply@example.com`),
			new HeaderOfMessage(`Sender`, `sender@example.com`),
		]);
		return;
	});
});
