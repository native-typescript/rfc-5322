import {HeaderOfMessage} from "../../../header/index.ts";
import {Phrase} from "../../../phrase/index.ts";
import {Comments} from "./comments/index.ts";
import {InformationalFieldsOfHeadersOfMessage} from "./InformationalFieldsOfHeadersOfMessage.ts";
import {Keywords} from "./keywords/index.ts";
import {Subject} from "./subject/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`informational field wrappers`, async function executeTests(): Promise<void> {
	await test(`Comments Subject and Keywords headerify correctly`, async function executeTest(): Promise<void> {
		expect(new Comments(`a comment`).headerify()).toStrictEqual(
			new HeaderOfMessage(`Comments`, `a comment`),
		);
		expect(new Subject(`a subject`).headerify()).toStrictEqual(
			new HeaderOfMessage(`Subject`, `a subject`),
		);
		expect(
			new Keywords([new Phrase(`alpha`), new Phrase(`beta`)]).headerify(),
		).toStrictEqual(new HeaderOfMessage(`Keywords`, `alpha,beta`));
		return;
	});
	await test(`InformationalFieldsOfHeadersOfMessage headerify yields comments keywords subject`, async function executeTest(): Promise<void> {
		const informational: InformationalFieldsOfHeadersOfMessage =
			new InformationalFieldsOfHeadersOfMessage(
				[new Comments(`first`), new Comments(`second`)],
				[new Keywords([new Phrase(`one`)]), new Keywords([new Phrase(`two`)])],
				new Subject(`subject`),
			);
		expect(Array.from(informational.headerify())).toStrictEqual([
			new HeaderOfMessage(`Comments`, `first`),
			new HeaderOfMessage(`Comments`, `second`),
			new HeaderOfMessage(`Keywords`, `one`),
			new HeaderOfMessage(`Keywords`, `two`),
			new HeaderOfMessage(`Subject`, `subject`),
		]);
		return;
	});
	await test(`InformationalFieldsOfHeadersOfMessage headerify handles null fields`, async function executeTest(): Promise<void> {
		const informational: InformationalFieldsOfHeadersOfMessage =
			new InformationalFieldsOfHeadersOfMessage(null, null, null);
		expect(Array.from(informational.headerify())).toStrictEqual([]);
		return;
	});
});
