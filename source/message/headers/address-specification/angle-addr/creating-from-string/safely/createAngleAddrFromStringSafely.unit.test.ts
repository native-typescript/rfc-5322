import {AddrSpec} from "../../../address/index.ts";
import {AngleAddr} from "../../AngleAddr.ts";
import {createAngleAddrFromStringUnsafely} from "../unsafely/index.ts";
import {createAngleAddrFromStringSafely} from "./createAngleAddrFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createAngleAddrFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringSafely parses angle-addr`, async function executeTest(): Promise<void> {
		const createdAngleAddr: AngleAddr | null =
			createAngleAddrFromStringSafely(`<john@example.com>`);
		const expectedAngleAddr = new AngleAddr(
			new AddrSpec(`john`, `example.com`),
		);
		expect(createdAngleAddr).toStrictEqual(expectedAngleAddr);
		return;
	});
	await test(`createFromStringSafely returns null for invalid input`, async function executeTest(): Promise<void> {
		const createdAngleAddr: AngleAddr | null =
			createAngleAddrFromStringSafely(`john@example.com`);
		expect(createdAngleAddr).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null for invalid addr-spec`, async function executeTest(): Promise<void> {
		const createdAngleAddr: AngleAddr | null =
			createAngleAddrFromStringSafely(`<invalid>`);
		expect(createdAngleAddr).toBeNull();
		return;
	});
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateAngleAddr(): void {
			createAngleAddrFromStringUnsafely(`john@example.com`);
		}).toThrow(`Invalid angle-addr string.`);
		return;
	});
	return;
});
