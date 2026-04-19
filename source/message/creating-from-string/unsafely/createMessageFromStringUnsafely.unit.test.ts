import {createMessageFromStringUnsafely} from "./createMessageFromStringUnsafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMessageFromStringUnsafely`, async function executeFixedTests(): Promise<void> {
	await test(`throws for invalid format without header/body separator`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMessage(): void {
			createMessageFromStringUnsafely(`Subject: Test\r\nBody`);
		}).toThrow(`Invalid RFC 5322 message format`);
		return;
	});
	await test(`returns message without body when separator has no body`, async function executeTest(): Promise<void> {
		const createdMessage = createMessageFromStringUnsafely(
			`From: alice@example.com\r\nDate: Wed, 2 Oct 2002 13:00:00 GMT\r\n\r\n`,
		);
		expect(createdMessage.serialize()).toStrictEqual(
			`Date: Wed, 02 Oct 2002 13:00:00 GMT\r\nFrom: alice@example.com\r\n\r\n`,
		);
		return;
	});
	await test(`returns message with body when body is present`, async function executeTest(): Promise<void> {
		const createdMessage = createMessageFromStringUnsafely(
			`From: alice@example.com\r\nDate: Wed, 2 Oct 2002 13:00:00 GMT\r\n\r\nHello`,
		);
		expect(createdMessage.serialize()).toStrictEqual(
			`Date: Wed, 02 Oct 2002 13:00:00 GMT\r\nFrom: alice@example.com\r\n\r\nHello`,
		);
		return;
	});
	return;
});
/*
await describe(`createMessageFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`throws for invalid format without header/body separator`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMessage(): void {
			createMessageFromStringUnsafely(`Subject: Test\r
Body`);
		}).toThrow(`Invalid RFC 5322 message format`);
		return;
	});
	await test(`returns message without body when separator has no body`, async function executeTest(): Promise<void> {
		const createdMessage = createMessageFromStringUnsafely(
			`From: alice@example.com\r
Date: Wed, 2 Oct 2002 13:00:00 GMT\r\n\r\n`,
		);
		expect(createdMessage.serialize()).toStrictEqual(
Date:Wed,2 Oct 2002 13:00:00 GMT\r\n`,
			`Date: Wed, 02 Oct 2002 13:00:00 GMT\r\nFrom: alice@example.com\r\n\r\n`,
		);
		return;
	});
	await test(`returns message with body when body is present`, async function executeTest(): Promise<void> {
		const createdMessage = createMessageFromStringUnsafely(
			`From: alice@example.com\r
Date: Wed, 2 Oct 2002 13:00:00 GMT\r\n\r\nHello`,
		);
		expect(createdMessage.serialize()).toStrictEqual(
Date:Wed,2 Oct 2002 13:00:00 GMT\r\n\r\nHello`,
			`Date: Wed, 02 Oct 2002 13:00:00 GMT\r\nFrom: alice@example.com\r\n\r\nHello`,
		);
		return;
	});
	return;
});
*/
