import {AddrSpec} from "../../../addr-spec/index.ts";
import {
	WithJustOneMailboxGroupList,
	WithMoreThanOneMailboxGroupList,
} from "../../implementations/index.ts";
import type {SupportedGroupList} from "../../supported/index.ts";
import {createGroupListFromStringUnsafely} from "../unsafely/index.ts";
import {createGroupListFromStringSafely} from "./createGroupListFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createGroupListFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringSafely parses a single mailbox`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(`alice@example.com`);
		const expectedGroupList = new WithJustOneMailboxGroupList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(createdGroupList).toStrictEqual(expectedGroupList);
		return;
	});
	await test(`createFromStringSafely parses multiple mailboxes`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(
				`alice@example.com,bob@example.com,carol@example.com`,
			);
		const expectedGroupList: WithMoreThanOneMailboxGroupList =
			new WithMoreThanOneMailboxGroupList(
				new AddrSpec(`alice`, `example.com`),
				new AddrSpec(`bob`, `example.com`),
				new AddrSpec(`carol`, `example.com`),
			);
		expect(createdGroupList).toStrictEqual(expectedGroupList);
		return;
	});
	await test(`createFromStringSafely returns null for empty input`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(``);
		expect(createdGroupList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null when second mailbox is invalid`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(`alice@example.com,not-a-mailbox`);
		expect(createdGroupList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null when later mailbox is invalid`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(
				`alice@example.com,bob@example.com,not-a-mailbox`,
			);
		expect(createdGroupList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null when first mailbox is invalid`, async function executeTest(): Promise<void> {
		const createdGroupList: null | SupportedGroupList =
			createGroupListFromStringSafely(`,alice@example.com`);
		expect(createdGroupList).toBeNull();
		return;
	});
	return;
});
await describe(`createGroupListFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateGroupList(): void {
			createGroupListFromStringUnsafely(`not-a-mailbox`);
		}).toThrow(`Invalid group-list format.`);
		return;
	});
	await test(`createFromStringUnsafely returns mailbox list for valid input`, async function executeTest(): Promise<void> {
		const createdGroupList: SupportedGroupList =
			createGroupListFromStringUnsafely(`alice@example.com,bob@example.com`);
		const expectedGroupList: SupportedGroupList =
			new WithMoreThanOneMailboxGroupList(
				new AddrSpec(`alice`, `example.com`),
				new AddrSpec(`bob`, `example.com`),
			);
		expect(createdGroupList).toStrictEqual(expectedGroupList);
		return;
	});
	await test(`createFromStringUnsafely throws for empty input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateGroupList(): void {
			createGroupListFromStringUnsafely(``);
		}).toThrow(`Invalid group-list format.`);
		return;
	});
	return;
});
