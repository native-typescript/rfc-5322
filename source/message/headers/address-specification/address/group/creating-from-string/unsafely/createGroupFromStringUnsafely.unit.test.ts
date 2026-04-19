import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithMoreThanOneMailboxGroupList} from "../../../group-list/index.ts";
import {WithDisplayNameNameAddr} from "../../../name-addr/index.ts";
import type {Group} from "../../Group.ts";
import {WithGroupListGroup} from "../../implementations/index.ts";
import {createGroupFromStringUnsafely} from "./createGroupFromStringUnsafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createGroupFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`parses group with mailbox list`, async function executeTest(): Promise<void> {
		const createdGroup: Group = createGroupFromStringUnsafely(
			`Friends: John Doe <john.doe@example.com>,jane.doe@example.com;`,
		);
		const expectedGroup: Group = new WithGroupListGroup(
			`Friends`,
			new WithMoreThanOneMailboxGroupList(
				new WithDisplayNameNameAddr(
					`John Doe`,
					new AngleAddr(new AddrSpec(`john.doe`, `example.com`)),
				),
				new AddrSpec(`jane.doe`, `example.com`),
			),
		);
		expect(createdGroup).toStrictEqual(expectedGroup);
		return;
	});
	await test(`throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateGroup(): void {
			createGroupFromStringUnsafely(`not-a-group`);
		}).toThrow(`Invalid group string.`);
		return;
	});
	return;
});
