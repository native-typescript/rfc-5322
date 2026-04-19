import {AddrSpec} from "../../../addr-spec/index.ts";
import {
	WithJustOneMailboxMailboxList,
	WithMoreThanOneMailboxMailboxList,
} from "../../implementations/index.ts";
import type {SupportedMailboxList} from "../../supported/index.ts";
import {createMailboxListFromStringUnsafely} from "../unsafely/index.ts";
import {createMailboxListFromStringSafely} from "./createMailboxListFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMailboxListFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringSafely parses a single mailbox`, async function executeTest(): Promise<void> {
		const createdMailboxList: null | SupportedMailboxList =
			createMailboxListFromStringSafely(`alice@example.com`);
		const expectedMailboxList = new WithJustOneMailboxMailboxList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(createdMailboxList).toStrictEqual(expectedMailboxList);
		return;
	});
	await test(`createFromStringSafely parses multiple mailboxes`, async function executeTest(): Promise<void> {
		const createdMailboxList: null | SupportedMailboxList =
			createMailboxListFromStringSafely(
				`alice@example.com,bob@example.com,carol@example.com`,
			);
		const expectedMailboxList: WithMoreThanOneMailboxMailboxList =
			new WithMoreThanOneMailboxMailboxList(
				new AddrSpec(`alice`, `example.com`),
				new AddrSpec(`bob`, `example.com`),
				new AddrSpec(`carol`, `example.com`),
			);
		expect(createdMailboxList).toStrictEqual(expectedMailboxList);
		return;
	});
	await test(`createFromStringSafely returns null for empty input`, async function executeTest(): Promise<void> {
		const createdMailboxList: null | SupportedMailboxList =
			createMailboxListFromStringSafely(``);
		expect(createdMailboxList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null for invalid later mailbox`, async function executeTest(): Promise<void> {
		const createdMailboxList: null | SupportedMailboxList =
			createMailboxListFromStringSafely(
				`alice@example.com,bob@example.com,not-a-mailbox`,
			);
		expect(createdMailboxList).toBeNull();
		return;
	});
	return;
});
await describe(`createMailboxListFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMailboxListFromString(): void {
			createMailboxListFromStringUnsafely(`not-a-mailbox`);
		}).toThrow(`Invalid mailbox-list format`);
		return;
	});
	await test(`createFromStringUnsafely returns mailbox list for valid input`, async function executeTest(): Promise<void> {
		const createdMailboxList: SupportedMailboxList =
			createMailboxListFromStringUnsafely(`alice@example.com,bob@example.com`);
		const expectedMailboxList: SupportedMailboxList =
			new WithMoreThanOneMailboxMailboxList(
				new AddrSpec(`alice`, `example.com`),
				new AddrSpec(`bob`, `example.com`),
			);
		expect(createdMailboxList).toStrictEqual(expectedMailboxList);
		return;
	});
	await test(`createFromStringUnsafely throws for empty input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMailboxListFromString(): void {
			createMailboxListFromStringUnsafely(``);
		}).toThrow(`Invalid mailbox-list format`);
		return;
	});
	return;
});
