import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithMoreThanOneMailboxGroupList} from "./WithMoreThanOneMailboxGroupList.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithMoreThanOneMailboxGroupList`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr specs in order`, async function executeTest(): Promise<void> {
		const groupList = new WithMoreThanOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(Array.from(groupList.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailboxes in order`, async function executeTest(): Promise<void> {
		const groupList = new WithMoreThanOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(Array.from(groupList.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`serialize joins mailboxes with comma`, async function executeTest(): Promise<void> {
		const groupList = new WithMoreThanOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(groupList.serialize()).toStrictEqual(
			`alice@example.com,bob@example.com`,
		);
		return;
	});
	await test(`stringify joins mailboxes with comma`, async function executeTest(): Promise<void> {
		const groupList = new WithMoreThanOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(groupList.stringify()).toStrictEqual(
			`alice@example.com,bob@example.com`,
		);
		return;
	});
	return;
});
