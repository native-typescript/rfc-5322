import {
	AddrSpec,
	WithJustOneMailboxMailboxList,
} from "../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../header/index.ts";
import {MsgId} from "../../../msg-id/index.ts";
import {WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage} from "./block/index.ts";
import {computeResentFieldsOfHeadersOfMessage} from "./computing/index.ts";
import {ResentFieldsOfHeadersOfMessage} from "./ResentFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`ResentFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`headerify yields headers of each resent block`, async function executeTest(): Promise<void> {
		const block =
			new WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
				new Date(`Wed, 2 Oct 2002 13:00:00 GMT`),
				new WithJustOneMailboxMailboxList(new AddrSpec(`from`, `example.com`)),
				new MsgId(`message`, `example.com`),
				null,
				null,
				null,
				null,
			);
		const resentFields = new ResentFieldsOfHeadersOfMessage(block);
		expect(Array.from(resentFields.headerify())).toStrictEqual([
			new HeaderOfMessage(`Resent-Date`, `Wed, 02 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(`Resent-From`, `from@example.com`),
			new HeaderOfMessage(`Resent-Message-ID`, `<message@example.com>`),
		]);
		return;
	});
});
await describe(`computeResentFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty resent fields when no resent headers exist`, async function executeTest(): Promise<void> {
		expect(computeResentFieldsOfHeadersOfMessage([])).toStrictEqual(
			new ResentFieldsOfHeadersOfMessage(),
		);
		return;
	});
	await test(`throws when resent block misses date`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeResent(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-From`, `from@example.com`),
			]);
		}).toThrow(`A Resent-Date header is missing in resent block.`);
		return;
	});
	await test(`throws when resent block misses from`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeResent(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
			]);
		}).toThrow(`A Resent-From header is missing in resent block.`);
		return;
	});
	await test(`throws when multiple from addresses exist but sender is missing`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeResent(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com,b@example.com`),
			]);
		}).toThrow(
			`A Resent-Sender header is required when there are multiple Resent-From addresses.`,
		);
		return;
	});
	await test(`throws on duplicate headers inside one resent block`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeResent(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com`),
				new HeaderOfMessage(`Resent-From`, `b@example.com`),
			]);
		}).toThrow(
			`Multiple Resent-From headers are not allowed in a resent block.`,
		);
		return;
	});
	await test(`throws on duplicate Resent-Sender header`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeResent(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com,b@example.com`),
				new HeaderOfMessage(`Resent-Sender`, `sender@example.com`),
				new HeaderOfMessage(`Resent-Sender`, `sender2@example.com`),
			]);
		}).toThrow(
			`Multiple Resent-Sender headers are not allowed in a resent block.`,
		);
		return;
	});
	await test(`throws on duplicate Resent-To Resent-Cc Resent-Bcc and Resent-Message-ID`, async function executeTest(): Promise<void> {
		expect(function attemptDuplicateResentTo(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com`),
				new HeaderOfMessage(`Resent-To`, `to@example.com`),
				new HeaderOfMessage(`Resent-To`, `to2@example.com`),
			]);
		}).toThrow(`Multiple Resent-To headers are not allowed in a resent block.`);
		expect(function attemptDuplicateResentCc(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com`),
				new HeaderOfMessage(`Resent-Cc`, `cc@example.com`),
				new HeaderOfMessage(`Resent-Cc`, `cc2@example.com`),
			]);
		}).toThrow(`Multiple Resent-Cc headers are not allowed in a resent block.`);
		expect(function attemptDuplicateResentBcc(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com`),
				new HeaderOfMessage(`Resent-Bcc`, `bcc@example.com`),
				new HeaderOfMessage(`Resent-Bcc`, `bcc2@example.com`),
			]);
		}).toThrow(
			`Multiple Resent-Bcc headers are not allowed in a resent block.`,
		);
		expect(function attemptDuplicateResentMessageId(): void {
			computeResentFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
				new HeaderOfMessage(`Resent-From`, `a@example.com`),
				new HeaderOfMessage(`Resent-Message-ID`, `<one@example.com>`),
				new HeaderOfMessage(`Resent-Message-ID`, `<two@example.com>`),
			]);
		}).toThrow(
			`Multiple Resent-Message-ID headers are not allowed in a resent block.`,
		);
		return;
	});
	await test(`computes multiple valid resent blocks`, async function executeTest(): Promise<void> {
		const computed = computeResentFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Resent-Date`, `Wed, 2 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(`Resent-From`, `first@example.com`),
			new HeaderOfMessage(`Resent-Message-ID`, `<one@example.com>`),
			new HeaderOfMessage(`Resent-Date`, `Thu, 3 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(
				`Resent-From`,
				`second@example.com,third@example.com`,
			),
			new HeaderOfMessage(`Resent-Sender`, `sender@example.com`),
			new HeaderOfMessage(`Resent-To`, `to@example.com`),
		]);
		expect(Array.from(computed.headerify())).toStrictEqual([
			new HeaderOfMessage(`Resent-Date`, `Wed, 02 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(`Resent-From`, `first@example.com`),
			new HeaderOfMessage(`Resent-Message-ID`, `<one@example.com>`),
			new HeaderOfMessage(`Resent-Date`, `Thu, 03 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(
				`Resent-From`,
				`second@example.com,third@example.com`,
			),
			new HeaderOfMessage(`Resent-Sender`, `sender@example.com`),
			new HeaderOfMessage(`Resent-To`, `to@example.com`),
		]);
		return;
	});
});
