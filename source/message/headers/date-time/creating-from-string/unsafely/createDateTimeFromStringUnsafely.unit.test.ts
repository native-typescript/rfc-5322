import type {DateTime} from "../../DateTime.ts";
import {createDateTimeFromStringUnsafely} from "./createDateTimeFromStringUnsafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createDateTimeFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateDateTime(): void {
			createDateTimeFromStringUnsafely(`not-a-date-time`);
		}).toThrow(`Invalid date-time string.`);
		return;
	});
	await test(`returns DateTime for valid input`, async function executeTest(): Promise<void> {
		const createdDateTime: DateTime = createDateTimeFromStringUnsafely(
			`Wed, 2 Oct 2002 13:00:00 GMT`,
		);
		const expectedDateTime: Date = new Date(`Wed, 2 Oct 2002 13:00:00 GMT`);
		expect(createdDateTime).toStrictEqual(expectedDateTime);
		return;
	});
	return;
});
