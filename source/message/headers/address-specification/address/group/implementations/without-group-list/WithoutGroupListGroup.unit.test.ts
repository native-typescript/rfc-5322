import {WithoutGroupListGroup} from "./WithoutGroupListGroup.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`WithoutGroupListGroup`, async function executeTests(): Promise<void> {
	await test(`stringifies and iterates empty`, async function executeTest(): Promise<void> {
		const group: WithoutGroupListGroup = new WithoutGroupListGroup(`Team`);
		expect(group.serialize()).toBe(`${rfc2047.encode(`Team`)}:;`);
		expect(group.stringify()).toBe(`Team:;`);
		expect(Array.from(group.iterateMailboxes())).toStrictEqual([]);
		expect(Array.from(group.iterateAddrSpecs())).toStrictEqual([]);
		return;
	});
	return;
});
