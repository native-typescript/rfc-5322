import {HeaderOfMessage} from "../../../../header/index.ts";
import {OrigDate} from "../OrigDate.ts";
import {computeOrigDate} from "./computeOrigDate.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`computeOrigDate`, async function executeTests(): Promise<void> {
	await test(`throws when Date header is missing`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOrigDate(): void {
			computeOrigDate([]);
		}).toThrow(`Date header is required`);
		return;
	});
	await test(`throws when multiple Date headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeOrigDate(): void {
			computeOrigDate([
				new HeaderOfMessage(`Date`, `Mon, 16 Mar 2026 10:00:00 +0000`),
				new HeaderOfMessage(`Date`, `Tue, 17 Mar 2026 10:00:00 +0000`),
			]);
		}).toThrow(`Multiple Date headers are not allowed`);
		return;
	});
	await test(`returns parsed date for single Date header`, async function executeTest(): Promise<void> {
		const dateFields = computeOrigDate([
			new HeaderOfMessage(`Date`, `Mon, 16 Mar 2026 10:00:00 +0000`),
		]);
		expect(dateFields).toStrictEqual(
			new OrigDate(new Date(`Mon, 16 Mar 2026 10:00:00 +0000`)),
		);
		return;
	});
	return;
});
