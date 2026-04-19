import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithJustOneMailboxGroupList} from "./WithJustOneMailboxGroupList.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithJustOneMailboxGroupList`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr spec`, async function executeTest(): Promise<void> {
		const groupList = new WithJustOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(groupList.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailbox`, async function executeTest(): Promise<void> {
		const groupList = new WithJustOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(groupList.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`serialize returns mailbox string`, async function executeTest(): Promise<void> {
		const groupList = new WithJustOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(groupList.serialize()).toStrictEqual(`alice@example.com`);
		return;
	});
	await test(`stringify returns mailbox string`, async function executeTest(): Promise<void> {
		const groupList = new WithJustOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(groupList.stringify()).toStrictEqual(`alice@example.com`);
		return;
	});
	return;
});
