import type {DateTime} from "../../DateTime.ts";
import {createDateTimeFromStringUnsafely} from "../unsafely/index.ts";
import {createDateTimeFromStringSafely} from "./createDateTimeFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createDateTimeFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns DateTime for valid input`, async function executeTest(): Promise<void> {
		const createdDateTime: DateTime | null = createDateTimeFromStringSafely(
			`Wed, 2 Oct 2002 13:00:00 GMT`,
		);
		const expectedDateTime: Date = new Date(`Wed, 2 Oct 2002 13:00:00 GMT`);
		expect(createdDateTime).toStrictEqual(expectedDateTime);
		return;
	});
	await test(`returns null for invalid input`, async function executeTest(): Promise<void> {
		const createdDateTime: DateTime | null =
			createDateTimeFromStringSafely(`not-a-date-time`);
		expect(createdDateTime).toBeNull();
		return;
	});
	await test(`unsafe throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateDateTime(): void {
			createDateTimeFromStringUnsafely(`not-a-date-time`);
		}).toThrow(`Invalid date-time string.`);
		return;
	});
	return;
});
