import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithMoreThanOneMailboxMailboxList} from "./WithMoreThanOneMailboxMailboxList.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithMoreThanOneMailboxMailboxList`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr specs in order`, async function executeTest(): Promise<void> {
		const mailboxList = new WithMoreThanOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(Array.from(mailboxList.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailboxes in order`, async function executeTest(): Promise<void> {
		const mailboxList = new WithMoreThanOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(Array.from(mailboxList.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`serialize joins mailboxes with comma`, async function executeTest(): Promise<void> {
		const mailboxList = new WithMoreThanOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(mailboxList.serialize()).toStrictEqual(
			`alice@example.com,bob@example.com`,
		);
		return;
	});
	await test(`stringify joins mailboxes with comma`, async function executeTest(): Promise<void> {
		const mailboxList = new WithMoreThanOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		);
		expect(mailboxList.stringify()).toStrictEqual(
			`alice@example.com,bob@example.com`,
		);
		return;
	});
	return;
});
