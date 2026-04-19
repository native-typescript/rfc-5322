import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithJustOneMailboxMailboxList} from "./WithJustOneMailboxMailboxList.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithJustOneMailboxMailboxList`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr spec`, async function executeTest(): Promise<void> {
		const mailboxList = new WithJustOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(mailboxList.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailbox`, async function executeTest(): Promise<void> {
		const mailboxList = new WithJustOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(Array.from(mailboxList.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
		]);
		return;
	});
	await test(`serialize returns mailbox string`, async function executeTest(): Promise<void> {
		const mailboxList = new WithJustOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(mailboxList.serialize()).toStrictEqual(`alice@example.com`);
		return;
	});
	await test(`stringify returns mailbox string`, async function executeTest(): Promise<void> {
		const mailboxList = new WithJustOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(mailboxList.stringify()).toStrictEqual(`alice@example.com`);
		return;
	});
	return;
});
