import {AngleAddr} from "../../angle-addr/index.ts";
import {AddrSpec} from "../addr-spec/index.ts";
import {WithDisplayNameNameAddr} from "../name-addr/index.ts";
import {
	createMailboxFromStringSafely,
	createMailboxFromStringUnsafely,
} from "./creating-from-string/index.ts";
import type {Mailbox} from "./Mailbox.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createMailboxFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateMailbox(): void {
			createMailboxFromStringUnsafely(`not-a-mailbox`);
		}).toThrow(`Invalid mailbox string.`);
		return;
	});
	await test(`createFromStringUnsafely returns mailbox for valid input`, async function executeTest(): Promise<void> {
		const createdMailbox: Mailbox =
			createMailboxFromStringUnsafely(`alice@example.com`);
		const expectedMailbox: Mailbox = new AddrSpec(`alice`, `example.com`);
		expect(createdMailbox).toStrictEqual(expectedMailbox);
		return;
	});
	return;
});
await describe(`createMailboxFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns null for invalid input`, async function executeTest(): Promise<void> {
		expect(createMailboxFromStringSafely(`not-a-mailbox`)).toBeNull();
		return;
	});
	await test(`returns addr-spec for mailbox without display name`, async function executeTest(): Promise<void> {
		const createdMailbox: Mailbox | null =
			createMailboxFromStringSafely(`alice@example.com`);
		const expectedMailbox: Mailbox = new AddrSpec(`alice`, `example.com`);
		expect(createdMailbox).toStrictEqual(expectedMailbox);
		return;
	});
	await test(`returns name-addr for mailbox with display name`, async function executeTest(): Promise<void> {
		const createdMailbox: Mailbox | null = createMailboxFromStringSafely(
			`Bob <bob@example.com>`,
		);
		const expectedMailbox: Mailbox = new WithDisplayNameNameAddr(
			`Bob`,
			new AngleAddr(new AddrSpec(`bob`, `example.com`)),
		);
		expect(createdMailbox).toStrictEqual(expectedMailbox);
		return;
	});
	return;
});
