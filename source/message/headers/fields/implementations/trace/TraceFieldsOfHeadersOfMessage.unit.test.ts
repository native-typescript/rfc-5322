import {AddrSpec, AngleAddr} from "../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../header/index.ts";
import {computeTraceFieldsOfHeadersOfMessage} from "./computing/index.ts";
import {
	EmptyTraceFieldsOfHeadersOfMessage,
	NonEmptyTraceFieldsOfHeadersOfMessage,
	Received,
	Return,
} from "./implementations/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`trace field wrappers`, async function executeTests(): Promise<void> {
	await test(`Received and Return headerify correctly`, async function executeTest(): Promise<void> {
		const received: Received = new Received(
			`from mx.example.org by mail.example.org`,
			new Date(`Wed, 2 Oct 2002 13:00:00 GMT`),
		);
		expect(received.headerify()).toStrictEqual(
			new HeaderOfMessage(
				`Received`,
				`from mx.example.org by mail.example.org;Wed, 02 Oct 2002 13:00:00 GMT`,
			),
		);
		const returnPath: Return = new Return(
			new AngleAddr(new AddrSpec(`sender`, `example.com`)),
		);
		expect(returnPath.headerify()).toStrictEqual(
			new HeaderOfMessage(`Return-Path`, `<sender@example.com>`),
		);
		return;
	});
	await test(`NonEmptyTraceFieldsOfHeadersOfMessage headerify yields return path then received headers`, async function executeTest(): Promise<void> {
		const nonEmptyTrace = new NonEmptyTraceFieldsOfHeadersOfMessage(
			new Return(new AngleAddr(new AddrSpec(`sender`, `example.com`))),
			[
				new Received(
					`by mail.example.org`,
					new Date(`Wed, 2 Oct 2002 13:00:00 GMT`),
				),
			],
		);
		expect(Array.from(nonEmptyTrace.headerify())).toStrictEqual([
			new HeaderOfMessage(`Return-Path`, `<sender@example.com>`),
			new HeaderOfMessage(
				`Received`,
				`by mail.example.org;Wed, 02 Oct 2002 13:00:00 GMT`,
			),
		]);
		return;
	});
});
await describe(`computeTraceFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty trace fields for no trace headers`, async function executeTest(): Promise<void> {
		expect(computeTraceFieldsOfHeadersOfMessage([])).toStrictEqual(
			new EmptyTraceFieldsOfHeadersOfMessage(),
		);
		return;
	});
	await test(`throws when Return-Path appears without Received`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeTrace(): void {
			computeTraceFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Return-Path`, `<sender@example.com>`),
			]);
		}).toThrow(
			`A Received header is required when Return-Path header is present.`,
		);
		return;
	});
	await test(`throws when multiple Return-Path headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeTrace(): void {
			computeTraceFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Return-Path`, `<sender@example.com>`),
				new HeaderOfMessage(`Return-Path`, `<sender2@example.com>`),
				new HeaderOfMessage(`Received`, `from a; Wed, 2 Oct 2002 13:00:00 GMT`),
			]);
		}).toThrow(`Multiple Return-Path headers are not allowed.`);
		return;
	});
	await test(`throws for invalid received format without semicolon`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeTrace(): void {
			computeTraceFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Received`, `from mx.example.org`),
			]);
		}).toThrow(`Invalid Received header format.`);
		return;
	});
	await test(`throws for invalid received format with empty parts`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeTrace(): void {
			computeTraceFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Received`, ` ; `),
			]);
		}).toThrow(`Invalid Received header format.`);
		return;
	});
	await test(`computes non-empty trace fields from return-path and received headers`, async function executeTest(): Promise<void> {
		const computed = computeTraceFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Return-Path`, `<sender@example.com>`),
			new HeaderOfMessage(`Received`, `from mx1; Wed, 2 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(`Received`, `from mx2; Thu, 3 Oct 2002 13:00:00 GMT`),
		]);
		expect(computed).toStrictEqual(
			new NonEmptyTraceFieldsOfHeadersOfMessage(
				new Return(new AngleAddr(new AddrSpec(`sender`, `example.com`))),
				[
					new Received(`from mx1`, new Date(`Wed, 2 Oct 2002 13:00:00 GMT`)),
					new Received(`from mx2`, new Date(`Thu, 3 Oct 2002 13:00:00 GMT`)),
				],
			),
		);
		return;
	});
});
