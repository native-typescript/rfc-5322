import {AddrSpec} from "../address/index.ts";
import {AngleAddr} from "./AngleAddr.ts";
import {createAngleAddrFromStringUnsafely} from "./creating-from-string/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`AngleAddr`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr spec`, async function executeTest(): Promise<void> {
		const angleAddr: AngleAddr = new AngleAddr(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(angleAddr.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailbox`, async function executeTest(): Promise<void> {
		const angleAddr: AngleAddr = new AngleAddr(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(angleAddr.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`serialize wraps addr-spec with brackets`, async function executeTest(): Promise<void> {
		const angleAddr: AngleAddr = new AngleAddr(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(angleAddr.serialize()).toStrictEqual(`<alice@example.com>`);
		return;
	});
	await test(`stringify wraps addr-spec with brackets`, async function executeTest(): Promise<void> {
		const angleAddr: AngleAddr = new AngleAddr(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(angleAddr.stringify()).toStrictEqual(`<alice@example.com>`);
		return;
	});
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateAngleAddr(): void {
			createAngleAddrFromStringUnsafely(`john@example.com`);
		}).toThrow(`Invalid angle-addr string.`);
		return;
	});
	await test(`createFromStringUnsafely returns angle-addr for valid input`, async function executeTest(): Promise<void> {
		const createdAngleAddr: AngleAddr =
			createAngleAddrFromStringUnsafely(`<john@example.com>`);
		const expectedAngleAddr: AngleAddr = new AngleAddr(
			new AddrSpec(`john`, `example.com`),
		);
		expect(createdAngleAddr).toStrictEqual(expectedAngleAddr);
		return;
	});
	return;
});
