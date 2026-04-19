import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {WithMoreThanOneMailboxGroupList} from "../../../group-list/index.ts";
import {WithDisplayNameNameAddr} from "../../../name-addr/index.ts";
import {WithGroupListGroup} from "./WithGroupListGroup.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`WithGroupListGroup`, async function executeTests(): Promise<void> {
	await test(`stringifies and iterates mailboxes`, async function executeTest(): Promise<void> {
		const group: WithGroupListGroup = new WithGroupListGroup(
			`Friends`,
			new WithMoreThanOneMailboxGroupList(
				new WithDisplayNameNameAddr(
					`John Doe`,
					new AngleAddr(new AddrSpec(`john.doe`, `example.com`)),
				),
				new AddrSpec(`jane.doe`, `example.com`),
			),
		);
		const expectedStringWithEncoding: string = `${rfc2047.encode(`Friends`)}:${group.groupList.serialize()};`;
		const expectedStringWithoutEncoding: string = `Friends:${group.groupList.stringify()};`;
		expect(group.serialize()).toBe(expectedStringWithEncoding);
		expect(group.stringify()).toBe(expectedStringWithoutEncoding);
		expect(Array.from(group.iterateMailboxes())).toStrictEqual([
			new WithDisplayNameNameAddr(
				`John Doe`,
				new AngleAddr(new AddrSpec(`john.doe`, `example.com`)),
			),
			new AddrSpec(`jane.doe`, `example.com`),
		]);
		expect(Array.from(group.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`john.doe`, `example.com`),
			new AddrSpec(`jane.doe`, `example.com`),
		]);
		return;
	});
	return;
});
