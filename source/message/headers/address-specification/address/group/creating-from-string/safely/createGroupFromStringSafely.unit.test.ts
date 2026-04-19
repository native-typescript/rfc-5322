import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithMoreThanOneMailboxGroupList} from "../../../group-list/index.ts";
import {WithDisplayNameNameAddr} from "../../../name-addr/index.ts";
import type {Group} from "../../Group.ts";
import {
	WithGroupListGroup,
	WithoutGroupListGroup,
} from "../../implementations/index.ts";
import {createGroupFromStringSafely} from "./createGroupFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`createGroupFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`parses group with mailbox list`, async function executeTest(): Promise<void> {
		const createdGroup: Group | null = createGroupFromStringSafely(
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
	await test(`parses group without list`, async function executeTest(): Promise<void> {
		const createdGroup: Group | null = createGroupFromStringSafely(`Team:;`);
		const expectedGroup: Group = new WithoutGroupListGroup(`Team`);
		expect(createdGroup).toStrictEqual(expectedGroup);
		return;
	});
	await test(`decodes encoded display name`, async function executeTest(): Promise<void> {
		const encodedDisplayName: string = rfc2047.encode(`Jöhn Group`);
		const createdGroup: Group | null = createGroupFromStringSafely(
			`${encodedDisplayName}:;`,
		);
		const expectedGroup: Group = new WithoutGroupListGroup(`Jöhn Group`);
		expect(createdGroup).toStrictEqual(expectedGroup);
		return;
	});
	await test(`returns null for invalid group`, async function executeTest(): Promise<void> {
		const createdGroup: Group | null =
			createGroupFromStringSafely(`not-a-group`);
		expect(createdGroup).toBeNull();
		return;
	});
	return;
});
