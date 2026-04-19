import {AngleAddr} from "../../../angle-addr/index.ts";
import {AddrSpec} from "../../addr-spec/index.ts";
import type {Address} from "../../Address.ts";
import {WithMoreThanOneMailboxGroupList} from "../../group-list/index.ts";
import {WithGroupListGroup, WithoutGroupListGroup} from "../../group/index.ts";
import {WithDisplayNameNameAddr} from "../../name-addr/index.ts";
import {createAddressFromStringUnsafely} from "../unsafely/index.ts";
import {createAddressFromStringSafely} from "./createAddressFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createAddressFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns group with mailbox list`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null = createAddressFromStringSafely(
			`Friends: John Doe <john.doe@example.com>,jane.doe@example.com;`,
		);
		const expectedAddress: Address = new WithGroupListGroup(
			`Friends`,
			new WithMoreThanOneMailboxGroupList(
				new WithDisplayNameNameAddr(
					`John Doe`,
					new AngleAddr(new AddrSpec(`john.doe`, `example.com`)),
				),
				new AddrSpec(`jane.doe`, `example.com`),
			),
		);
		expect(createdAddress).toStrictEqual(expectedAddress);
		return;
	});
	await test(`returns group without list`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null =
			createAddressFromStringSafely(`Team:;`);
		const expectedAddress: Address = new WithoutGroupListGroup(`Team`);
		expect(createdAddress).toStrictEqual(expectedAddress);
		return;
	});
	await test(`returns mailbox for addr-spec`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null =
			createAddressFromStringSafely(`alice@example.com`);
		const expectedAddress: Address = new AddrSpec(`alice`, `example.com`);
		expect(createdAddress).toStrictEqual(expectedAddress);
		return;
	});
	await test(`returns mailbox for name-addr`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null = createAddressFromStringSafely(
			`Bob <bob@example.com>`,
		);
		const expectedAddress: Address = new WithDisplayNameNameAddr(
			`Bob`,
			new AngleAddr(new AddrSpec(`bob`, `example.com`)),
		);
		expect(createdAddress).toStrictEqual(expectedAddress);
		return;
	});
	await test(`returns null for invalid input`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null =
			createAddressFromStringSafely(`not-an-address`);
		expect(createdAddress).toBeNull();
		return;
	});
	await test(`returns null for invalid group list`, async function executeTest(): Promise<void> {
		const createdAddress: Address | null = createAddressFromStringSafely(
			`Friends: not-a-mailbox;`,
		);
		expect(createdAddress).toBeNull();
		return;
	});
	await test(`unsafe throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateAddress(): void {
			createAddressFromStringUnsafely(`not-an-address`);
		}).toThrow(`Invalid address string.`);
		return;
	});
	await test(`unsafe returns address for valid input`, async function executeTest(): Promise<void> {
		const createdAddress: Address =
			createAddressFromStringUnsafely(`alice@example.com`);
		expect(createdAddress).toStrictEqual(new AddrSpec(`alice`, `example.com`));
		return;
	});
	return;
});
