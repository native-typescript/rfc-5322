import {Phrase} from "./Phrase.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Phrase`, async function executeTests(): Promise<void> {
	await test(`serialize returns original value`, async function executeTest(): Promise<void> {
		const phrase: Phrase = new Phrase(`hello`);
		expect(phrase.serialize()).toStrictEqual(`hello`);
		return;
	});
});
