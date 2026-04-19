import {AddrSpec} from "./AddrSpec.ts";
import {
	createAddrSpecFromStringSafely,
	createAddrSpecFromStringUnsafely,
} from "./creating-from-string/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createAddrSpecFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateAddrSpec(): void {
			createAddrSpecFromStringUnsafely(`not-an-addr-spec`);
		}).toThrow(`Invalid addr-spec string.`);
		return;
	});
	await test(`createFromStringUnsafely returns addr-spec for valid input`, async function executeTest(): Promise<void> {
		const createdAddrSpec: AddrSpec =
			createAddrSpecFromStringUnsafely(`alice@example.com`);
		const expectedAddrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(createdAddrSpec).toStrictEqual(expectedAddrSpec);
		return;
	});
	return;
});
await describe(`AddrSpec`, async function executeTests(): Promise<void> {
	await test(`equals returns true for identical local part and domain`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.equals(new AddrSpec(`alice`, `example.com`))).toBe(true);
		return;
	});
	await test(`equals returns false for different local part`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.equals(new AddrSpec(`bob`, `example.com`))).toBe(false);
		return;
	});
	await test(`equals returns false for different domain`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.equals(new AddrSpec(`alice`, `example.org`))).toBe(false);
		return;
	});
	await test(`iterateAddrSpecs yields itself`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(Array.from(addrSpec.iterateAddrSpecs())).toStrictEqual([addrSpec]);
		return;
	});
	await test(`iterateMailboxes yields itself`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(Array.from(addrSpec.iterateMailboxes())).toStrictEqual([addrSpec]);
		return;
	});
	await test(`extractAddrSpec returns itself`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.extractAddrSpec()).toBe(addrSpec);
		return;
	});
	await test(`serialize returns local@domain`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.serialize()).toStrictEqual(`alice@example.com`);
		return;
	});
	await test(`stringify returns local@domain`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(addrSpec.stringify()).toStrictEqual(`alice@example.com`);
		return;
	});
	return;
});
await describe(`createAddrSpecFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns null for invalid input`, async function executeTest(): Promise<void> {
		expect(createAddrSpecFromStringSafely(`not-an-addr-spec`)).toBeNull();
		return;
	});
	await test(`returns addr-spec for valid input`, async function executeTest(): Promise<void> {
		const createdAddrSpec: AddrSpec | null =
			createAddrSpecFromStringSafely(`alice@example.com`);
		const expectedAddrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		expect(createdAddrSpec).toStrictEqual(expectedAddrSpec);
		return;
	});
	return;
});
