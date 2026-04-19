import {
	AddressList,
	AddrSpec,
	type Mailbox,
	WithJustOneMailboxMailboxList,
	WithMoreThanOneMailboxMailboxList,
} from "../../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
import {
	From,
	ReplyTo,
	Sender,
	WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
	WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage,
} from "../implementations/index.ts";
import {computeOriginatorFieldsOfHeadersOfMessage} from "./computeOriginatorFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`computeOriginatorFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`throws when From header is missing`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOriginator(): void {
			computeOriginatorFieldsOfHeadersOfMessage([]);
		}).toThrow(`From header is missing`);
		return;
	});
	await test(`throws when multiple From headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOriginator(): void {
			computeOriginatorFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`From`, `alice@example.com`),
				new HeaderOfMessage(`From`, `bob@example.com`),
			]);
		}).toThrow(`Multiple From headers are not allowed`);
		return;
	});
	await test(`throws when Sender header is missing and From has multiple mailboxes`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOriginator(): void {
			computeOriginatorFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`From`, `alice@example.com,bob@example.com`),
			]);
		}).toThrow(
			`Sender header is required when there are multiple From addresses`,
		);
		return;
	});
	await test(`returns originator without sender for single From mailbox`, async function executeTest(): Promise<void> {
		const originator = computeOriginatorFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`From`, `alice@example.com`),
		]);
		expect(originator).toStrictEqual(
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new AddrSpec(`alice`, `example.com`),
					),
				),
				null,
				null,
			),
		);
		return;
	});
	await test(`throws when multiple Sender headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOriginator(): void {
			computeOriginatorFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`From`, `alice@example.com`),
				new HeaderOfMessage(`Sender`, `bob@example.com`),
				new HeaderOfMessage(`Sender`, `carol@example.com`),
			]);
		}).toThrow(`Multiple Sender headers are not allowed`);
		return;
	});
	await test(`returns originator with sender for single From mailbox`, async function executeTest(): Promise<void> {
		const originator = computeOriginatorFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`From`, `alice@example.com`),
			new HeaderOfMessage(`Sender`, `sender@example.com`),
		]);
		expect(originator).toStrictEqual(
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new AddrSpec(`alice`, `example.com`),
					),
				),
				null,
				new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)),
			),
		);
		return;
	});
	await test(`returns originator with sender for multiple From mailboxes`, async function executeTest(): Promise<void> {
		const originator = computeOriginatorFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`From`, `alice@example.com,bob@example.com`),
			new HeaderOfMessage(`Sender`, `sender@example.com`),
		]);
		expect(originator).toStrictEqual(
			new WithMoreThanOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithMoreThanOneMailboxMailboxList(
						new AddrSpec(`alice`, `example.com`),
						new AddrSpec(`bob`, `example.com`),
					),
				),
				null,
				new Sender<Mailbox>(new AddrSpec(`sender`, `example.com`)),
			),
		);
		return;
	});
	await test(`returns originator with reply-to for single From mailbox`, async function executeTest(): Promise<void> {
		const originator = computeOriginatorFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`From`, `alice@example.com`),
			new HeaderOfMessage(`Reply-To`, `reply@example.com`),
		]);
		expect(originator).toStrictEqual(
			new WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
				new From(
					new WithJustOneMailboxMailboxList(
						new AddrSpec(`alice`, `example.com`),
					),
				),
				new ReplyTo(new AddressList(new AddrSpec(`reply`, `example.com`))),
				null,
			),
		);
		return;
	});
	await test(`throws when multiple Reply-To headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOriginator(): void {
			computeOriginatorFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`From`, `alice@example.com`),
				new HeaderOfMessage(`Reply-To`, `reply@example.com`),
				new HeaderOfMessage(`Reply-To`, `reply2@example.com`),
			]);
		}).toThrow(`Multiple Reply-To headers are not allowed`);
		return;
	});
	return;
});
