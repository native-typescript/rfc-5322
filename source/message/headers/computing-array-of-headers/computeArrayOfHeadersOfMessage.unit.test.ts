import {HeaderOfMessage} from "../header/index.ts";
import {computeArrayOfHeadersOfMessage} from "./computeArrayOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`computeArrayOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`parses a single header and sanitizes whitespace`, async function executeTest(): Promise<void> {
		const computedHeaders: readonly HeaderOfMessage[] =
			computeArrayOfHeadersOfMessage(`Subject:  hello\tworld \r\n`);
		const expectedHeaders: readonly HeaderOfMessage[] = [
			new HeaderOfMessage(`Subject`, `hello world`),
		];
		expect(computedHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	await test(`parses multiple headers`, async function executeTest(): Promise<void> {
		const computedHeaders: readonly HeaderOfMessage[] =
			computeArrayOfHeadersOfMessage(`Subject: Hi\r\nFrom: Alice\r\n`);
		const expectedHeaders: readonly HeaderOfMessage[] = [
			new HeaderOfMessage(`Subject`, `Hi`),
			new HeaderOfMessage(`From`, `Alice`),
		];
		expect(computedHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	await test(`supports folded header values with space`, async function executeTest(): Promise<void> {
		const computedHeaders: readonly HeaderOfMessage[] =
			computeArrayOfHeadersOfMessage(`Subject: Hello\r\n world\r\n`);
		const expectedHeaders: readonly HeaderOfMessage[] = [
			new HeaderOfMessage(`Subject`, `Hello world`),
		];
		expect(computedHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	await test(`supports folded header values with tab`, async function executeTest(): Promise<void> {
		const computedHeaders: readonly HeaderOfMessage[] =
			computeArrayOfHeadersOfMessage(`Subject: Hello\r\n\tworld\r\n`);
		const expectedHeaders: readonly HeaderOfMessage[] = [
			new HeaderOfMessage(`Subject`, `Hello world`),
		];
		expect(computedHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	await test(`parses header values with colon tab and space`, async function executeTest(): Promise<void> {
		const computedHeaders: readonly HeaderOfMessage[] =
			computeArrayOfHeadersOfMessage(`Subject: hi:there\tbuddy ok\r\n`);
		const expectedHeaders: readonly HeaderOfMessage[] = [
			new HeaderOfMessage(`Subject`, `hi:there buddy ok`),
		];
		expect(computedHeaders).toStrictEqual(expectedHeaders);
		return;
	});
	await test(`throws when header name is incomplete`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeArrayOfHeaders(): void {
			computeArrayOfHeadersOfMessage(`Subject`);
		}).toThrow(`Unexpected finalization in HeaderNameArrayOfHeadersParser`);
		return;
	});
	await test(`throws when header value is incomplete`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeArrayOfHeaders(): void {
			computeArrayOfHeadersOfMessage(`Subject: value`);
		}).toThrow(`Unexpected finalization in HeaderValueArrayOfHeadersParser`);
		return;
	});
	await test(`throws when line ends after carriage return`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeArrayOfHeaders(): void {
			computeArrayOfHeadersOfMessage(`Subject: value\r`);
		}).toThrow(
			`Unexpected finalization in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		return;
	});
	await test(`throws for invalid characters in header name`, async function executeTest(): Promise<void> {
		const cases: readonly {
			readonly expected: string;
			readonly input: string;
		}[] = [
			{
				expected: `Unexpected character "\r" in HeaderNameArrayOfHeadersParser.`,
				input: `Subject\r`,
			},
			{
				expected: `Unexpected character "\n" in HeaderNameArrayOfHeadersParser.`,
				input: `Subject\n`,
			},
			{
				expected: `Unexpected character " " in HeaderNameArrayOfHeadersParser.`,
				input: `Sub ject: value\r\n`,
			},
			{
				expected: `Unexpected character "\t" in HeaderNameArrayOfHeadersParser.`,
				input: `Sub\tject: value\r\n`,
			},
		];
		for (const {expected, input} of cases) {
			expect(function attemptToComputeArrayOfHeaders(): void {
				computeArrayOfHeadersOfMessage(input);
			}).toThrow(expected);
			continue;
		}
		return;
	});
	await test(`throws for bare line feed in header value`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeArrayOfHeaders(): void {
			computeArrayOfHeadersOfMessage(`Subject: value\n`);
		}).toThrow(`Unexpected character "\n" in HeaderValueArrayOfHeadersParser`);
		return;
	});
	await test(`throws for unexpected characters after carriage return`, async function executeTest(): Promise<void> {
		const cases: readonly {
			readonly expected: string;
			readonly input: string;
		}[] = [
			{
				expected: `Unexpected character "\r" in AfterCarriageReturnArrayOfHeadersParser.`,
				input: `Subject: value\r\r`,
			},
			{
				expected: `Unexpected character ":" in AfterCarriageReturnArrayOfHeadersParser.`,
				input: `Subject: value\r:`,
			},
			{
				expected: `Unexpected character "a" in AfterCarriageReturnArrayOfHeadersParser.`,
				input: `Subject: value\ra`,
			},
			{
				expected: `Unexpected character " " in AfterCarriageReturnArrayOfHeadersParser.`,
				input: `Subject: value\r `,
			},
			{
				expected: `Unexpected character "\t" in AfterCarriageReturnArrayOfHeadersParser.`,
				input: `Subject: value\r\t`,
			},
		];
		for (const {expected, input} of cases) {
			expect(function attemptToComputeArrayOfHeaders(): void {
				computeArrayOfHeadersOfMessage(input);
			}).toThrow(expected);
			continue;
		}
		return;
	});
	await test(`throws for unexpected characters after line feed`, async function executeTest(): Promise<void> {
		const cases: readonly {
			readonly expected: string;
			readonly input: string;
		}[] = [
			{
				expected: `Unexpected character "\r" in AfterLineFeedArrayOfHeadersParser.`,
				input: `Subject: value\r\n\r`,
			},
			{
				expected: `Unexpected character ":" in AfterLineFeedArrayOfHeadersParser.`,
				input: `Subject: value\r\n:`,
			},
			{
				expected: `Unexpected character "\n" in AfterLineFeedArrayOfHeadersParser.`,
				input: `Subject: value\r\n\n`,
			},
		];
		for (const {expected, input} of cases) {
			expect(function attemptToComputeArrayOfHeaders(): void {
				computeArrayOfHeadersOfMessage(input);
			}).toThrow(expected);
			continue;
		}
		return;
	});
	return;
});
