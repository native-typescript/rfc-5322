import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithoutDisplayNameNameAddr} from "./WithoutDisplayNameNameAddr.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithoutDisplayNameNameAddr`, async function executeTests(): Promise<void> {
	await test(`extractAddrSpec returns inner addr-spec`, async function executeTest(): Promise<void> {
		const addrSpec: AddrSpec = new AddrSpec(`alice`, `example.com`);
		const nameAddr: WithoutDisplayNameNameAddr = new WithoutDisplayNameNameAddr(
			new AngleAddr(addrSpec),
		);
		expect(nameAddr.extractAddrSpec()).toStrictEqual(addrSpec);
		return;
	});
	await test(`iterateAddrSpecs yields addr spec`, async function executeTest(): Promise<void> {
		const nameAddr: WithoutDisplayNameNameAddr = new WithoutDisplayNameNameAddr(
			new AngleAddr(new AddrSpec(`alice`, `example.com`)),
		);
		expect(Array.from(nameAddr.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailbox`, async function executeTest(): Promise<void> {
		const nameAddr: WithoutDisplayNameNameAddr = new WithoutDisplayNameNameAddr(
			new AngleAddr(new AddrSpec(`bob`, `example.com`)),
		);
		expect(Array.from(nameAddr.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`serialize returns angle-addr`, async function executeTest(): Promise<void> {
		const nameAddr: WithoutDisplayNameNameAddr = new WithoutDisplayNameNameAddr(
			new AngleAddr(new AddrSpec(`john`, `example.com`)),
		);
		expect(nameAddr.serialize()).toStrictEqual(`<john@example.com>`);
		return;
	});
	await test(`stringify returns angle-addr`, async function executeTest(): Promise<void> {
		const nameAddr: WithoutDisplayNameNameAddr = new WithoutDisplayNameNameAddr(
			new AngleAddr(new AddrSpec(`john`, `example.com`)),
		);
		expect(nameAddr.stringify()).toStrictEqual(`<john@example.com>`);
		return;
	});
	return;
});
