import {HeaderOfMessage} from "../../../../header/index.ts";
import {Phrase} from "../../../../phrase/index.ts";
import {Comments} from "../comments/index.ts";
import {InformationalFieldsOfHeadersOfMessage} from "../InformationalFieldsOfHeadersOfMessage.ts";
import {Keywords} from "../keywords/index.ts";
import {Subject} from "../subject/index.ts";
import {computeInformationalFieldsOfHeadersOfMessage} from "./computeInformationalFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`computeInformationalFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty object when Subject header is missing`, async function executeTest(): Promise<void> {
		expect(computeInformationalFieldsOfHeadersOfMessage([])).toStrictEqual(
			new InformationalFieldsOfHeadersOfMessage(null, null, null),
		);
		return;
	});
	await test(`throws when multiple Subject headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeInformational(): void {
			computeInformationalFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Subject`, `Subject 1`),
				new HeaderOfMessage(`Subject`, `Subject 2`),
			]);
		}).toThrow(`Multiple Subject headers are not allowed`);
		return;
	});
	await test(`decodes and returns subject`, async function executeTest(): Promise<void> {
		const encodedSubject: string = rfc2047.encode(`Jöhn Doe`);
		const informational = computeInformationalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Subject`, encodedSubject),
		]);
		expect(informational).toStrictEqual(
			new InformationalFieldsOfHeadersOfMessage(
				null,
				null,
				new Subject(`Jöhn Doe`),
			),
		);
		return;
	});
	await test(`collects and decodes comments`, async function executeTest(): Promise<void> {
		const encodedComment: string = rfc2047.encode(`Jöhn comment`);
		const informational = computeInformationalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Comments`, encodedComment),
			new HeaderOfMessage(`Comments`, `plain comment`),
		]);
		expect(informational).toStrictEqual(
			new InformationalFieldsOfHeadersOfMessage(
				[new Comments(`Jöhn comment`), new Comments(`plain comment`)],
				null,
				null,
			),
		);
		return;
	});
	await test(`collects keywords from one and multiple headers`, async function executeTest(): Promise<void> {
		const encodedKeyword: string = rfc2047.encode(`Këyword`);
		const informational = computeInformationalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Keywords`, `${encodedKeyword}, second`),
			new HeaderOfMessage(`Keywords`, `third`),
		]);
		expect(informational).toStrictEqual(
			new InformationalFieldsOfHeadersOfMessage(
				null,
				[
					new Keywords([new Phrase(`Këyword`), new Phrase(`second`)]),
					new Keywords([new Phrase(`third`)]),
				],
				null,
			),
		);
		return;
	});
	await test(`throws for invalid keywords header format`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeInformational(): void {
			computeInformationalFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Keywords`, `first,`),
			]);
		}).toThrow(`Invalid Keywords header format`);
		return;
	});
	await test(`parses comments keywords and subject together`, async function executeTest(): Promise<void> {
		const informational = computeInformationalFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Comments`, `A`),
			new HeaderOfMessage(`Keywords`, `one,two`),
			new HeaderOfMessage(`Subject`, `Hello`),
		]);
		expect(informational).toStrictEqual(
			new InformationalFieldsOfHeadersOfMessage(
				[new Comments(`A`)],
				[new Keywords([new Phrase(`one`), new Phrase(`two`)])],
				new Subject(`Hello`),
			),
		);
		return;
	});
	return;
});
