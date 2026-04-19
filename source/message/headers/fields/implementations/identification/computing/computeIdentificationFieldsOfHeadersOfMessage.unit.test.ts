import {HeaderOfMessage} from "../../../../header/index.ts";
import {MsgId} from "../../../../msg-id/index.ts";
import {IdentificationFieldsOfHeadersOfMessage} from "../IdentificationFieldsOfHeadersOfMessage.ts";
import {computeIdentificationFieldsOfHeadersOfMessage} from "./computeIdentificationFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`computeIdentificationFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty object when Message-ID is missing`, async function executeTest(): Promise<void> {
		expect(computeIdentificationFieldsOfHeadersOfMessage([])).toStrictEqual(
			new IdentificationFieldsOfHeadersOfMessage(null, null, null),
		);
		return;
	});
	await test(`throws when multiple Message-ID headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeIdentification(): void {
			computeIdentificationFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Message-ID`, `<left@right>`),
				new HeaderOfMessage(`Message-ID`, `<other@right>`),
			]);
		}).toThrow(`Multiple Message-ID headers are not allowed`);
		return;
	});
	await test(`throws when multiple In-Reply-To headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeIdentification(): void {
			computeIdentificationFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`In-Reply-To`, `<left@right>`),
				new HeaderOfMessage(`In-Reply-To`, `<other@right>`),
			]);
		}).toThrow(`Multiple In-Reply-To headers are not allowed`);
		return;
	});
	await test(`throws when multiple References headers are present`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeIdentification(): void {
			computeIdentificationFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`References`, `<left@right>`),
				new HeaderOfMessage(`References`, `<other@right>`),
			]);
		}).toThrow(`Multiple References headers are not allowed`);
		return;
	});
	await test(`returns messageId for single header`, async function executeTest(): Promise<void> {
		const identification = computeIdentificationFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Message-ID`, `<left@right>`),
		]);
		expect(identification).toStrictEqual(
			new IdentificationFieldsOfHeadersOfMessage(
				null,
				new MsgId(`left`, `right`),
				null,
			),
		);
		return;
	});
	await test(`returns inReplyTo and references when present`, async function executeTest(): Promise<void> {
		const identification = computeIdentificationFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`In-Reply-To`, `<inreply@right><inreply2@right>`),
			new HeaderOfMessage(`Message-ID`, `<left@right>`),
			new HeaderOfMessage(`References`, `<ref1@right> <ref2@right>`),
		]);
		expect(identification).toStrictEqual(
			new IdentificationFieldsOfHeadersOfMessage(
				[new MsgId(`inreply`, `right`), new MsgId(`inreply2`, `right`)],
				new MsgId(`left`, `right`),
				[new MsgId(`ref1`, `right`), new MsgId(`ref2`, `right`)],
			),
		);
		return;
	});
	return;
});
