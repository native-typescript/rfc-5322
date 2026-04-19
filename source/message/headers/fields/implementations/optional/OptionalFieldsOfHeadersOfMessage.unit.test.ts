import {HeaderOfMessage} from "../../../header/index.ts";
import {computeOptionalFieldsOfHeadersOfMessage} from "./computing/index.ts";
import {OptionalFieldsOfHeadersOfMessage} from "./OptionalFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`OptionalFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`headerify yields stored headers in order`, async function executeTest(): Promise<void> {
		const optionalFields = new OptionalFieldsOfHeadersOfMessage(
			new HeaderOfMessage(`X-One`, `1`),
			new HeaderOfMessage(`X-Two`, `2`),
		);
		expect(Array.from(optionalFields.headerify())).toStrictEqual([
			new HeaderOfMessage(`X-One`, `1`),
			new HeaderOfMessage(`X-Two`, `2`),
		]);
		return;
	});
});
await describe(`computeOptionalFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty optional fields for empty input`, async function executeTest(): Promise<void> {
		expect(computeOptionalFieldsOfHeadersOfMessage([])).toStrictEqual(
			new OptionalFieldsOfHeadersOfMessage(),
		);
		return;
	});
	await test(`collects only optional headers and ignores standard ones`, async function executeTest(): Promise<void> {
		const computed = computeOptionalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`From`, `alice@example.com`),
			new HeaderOfMessage(`X-Custom`, `custom`),
			new HeaderOfMessage(`Subject`, `subject`),
			new HeaderOfMessage(`X-Trace`, `trace`),
		]);
		expect(computed).toStrictEqual(
			new OptionalFieldsOfHeadersOfMessage(
				new HeaderOfMessage(`X-Custom`, `custom`),
				new HeaderOfMessage(`X-Trace`, `trace`),
			),
		);
		return;
	});
	await test(`ignores all standard RFC5322 header names`, async function executeTest(): Promise<void> {
		const computed = computeOptionalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Bcc`, `v`),
			new HeaderOfMessage(`Cc`, `v`),
			new HeaderOfMessage(`Comments`, `v`),
			new HeaderOfMessage(`Date`, `v`),
			new HeaderOfMessage(`From`, `v`),
			new HeaderOfMessage(`In-Reply-To`, `v`),
			new HeaderOfMessage(`Keywords`, `v`),
			new HeaderOfMessage(`Message-ID`, `v`),
			new HeaderOfMessage(`Received`, `v`),
			new HeaderOfMessage(`References`, `v`),
			new HeaderOfMessage(`Reply-To`, `v`),
			new HeaderOfMessage(`Resent-Bcc`, `v`),
			new HeaderOfMessage(`Resent-Cc`, `v`),
			new HeaderOfMessage(`Resent-Date`, `v`),
			new HeaderOfMessage(`Resent-From`, `v`),
			new HeaderOfMessage(`Resent-Message-ID`, `v`),
			new HeaderOfMessage(`Resent-Reply-To`, `v`),
			new HeaderOfMessage(`Resent-Sender`, `v`),
			new HeaderOfMessage(`Resent-To`, `v`),
			new HeaderOfMessage(`Return-Path`, `v`),
			new HeaderOfMessage(`Sender`, `v`),
			new HeaderOfMessage(`Subject`, `v`),
			new HeaderOfMessage(`To`, `v`),
		]);
		expect(computed).toStrictEqual(new OptionalFieldsOfHeadersOfMessage());
		return;
	});
});
