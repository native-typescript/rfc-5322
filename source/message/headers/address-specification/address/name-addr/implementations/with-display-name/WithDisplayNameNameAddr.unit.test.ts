import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithDisplayNameNameAddr} from "./WithDisplayNameNameAddr.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`WithDisplayNameNameAddr`, async function executeTests(): Promise<void> {
	await test(`extractAddrSpec returns inner addr-spec`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		const nameAddr: WithDisplayNameNameAddr = new WithDisplayNameNameAddr(
			`Alice`,
			new AngleAddr(addrSpec),
		);
		expect(nameAddr.extractAddrSpec()).toStrictEqual(addrSpec);
		return;
	});
	await test(`iterateAddrSpecs yields addr spec`, async function executeTest(): Promise<void> {
		const nameAddr: WithDisplayNameNameAddr = new WithDisplayNameNameAddr(
			`Alice`,
			new AngleAddr(new AddrSpec(`alice`, `example.com`)),
		);
		expect(Array.from(nameAddr.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailbox`, async function executeTest(): Promise<void> {
		const nameAddr: WithDisplayNameNameAddr = new WithDisplayNameNameAddr(
			`Bob`,
			new AngleAddr(new AddrSpec(`bob`, `example.com`)),
		);
		expect(Array.from(nameAddr.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`serialize encodes display name`, async function executeTest(): Promise<void> {
		const nameAddr: WithDisplayNameNameAddr = new WithDisplayNameNameAddr(
			`Jöhn Doe`,
			new AngleAddr(new AddrSpec(`john`, `example.com`)),
		);
		const expectedString = `${rfc2047.encode(`Jöhn Doe`)}<john@example.com>`;
		expect(nameAddr.serialize()).toStrictEqual(expectedString);
		return;
	});
	await test(`stringify keeps raw display name`, async function executeTest(): Promise<void> {
		const nameAddr: WithDisplayNameNameAddr = new WithDisplayNameNameAddr(
			`John Doe`,
			new AngleAddr(new AddrSpec(`john`, `example.com`)),
		);
		expect(nameAddr.stringify()).toStrictEqual(`John Doe<john@example.com>`);
		return;
	});
	return;
});
