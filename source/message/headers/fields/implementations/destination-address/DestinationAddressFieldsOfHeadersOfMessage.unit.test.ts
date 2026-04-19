import {AddressList, AddrSpec} from "../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../header/index.ts";
import {Bcc} from "./bcc/index.ts";
import {Cc} from "./cc/index.ts";
import {computeDestinationAddressFieldsOfHeadersOfMessage} from "./computing/index.ts";
import {DestinationAddressFieldsOfHeadersOfMessage} from "./DestinationAddressFieldsOfHeadersOfMessage.ts";
import {To} from "./to/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`destination address field wrappers`, async function executeTests(): Promise<void> {
	await test(`Bcc Cc and To headerify correctly`, async function executeTest(): Promise<void> {
		const addressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(new Bcc(addressList).headerify()).toStrictEqual(
			new HeaderOfMessage(`Bcc`, `alice@example.com`),
		);
		expect(new Cc(addressList).headerify()).toStrictEqual(
			new HeaderOfMessage(`Cc`, `alice@example.com`),
		);
		expect(new To(addressList).headerify()).toStrictEqual(
			new HeaderOfMessage(`To`, `alice@example.com`),
		);
		return;
	});
	await test(`DestinationAddressFieldsOfHeadersOfMessage headerify yields To Cc Bcc`, async function executeTest(): Promise<void> {
		const addressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
		);
		const fields: DestinationAddressFieldsOfHeadersOfMessage =
			new DestinationAddressFieldsOfHeadersOfMessage(
				new Bcc(addressList),
				new Cc(addressList),
				new To(addressList),
			);
		expect(Array.from(fields.headerify())).toStrictEqual([
			new HeaderOfMessage(`To`, `alice@example.com`),
			new HeaderOfMessage(`Cc`, `alice@example.com`),
			new HeaderOfMessage(`Bcc`, `alice@example.com`),
		]);
		return;
	});
});
await describe(`computeDestinationAddressFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`throws on duplicate Bcc`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeDestinationAddressFields(): void {
			computeDestinationAddressFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Bcc`, `alice@example.com`),
				new HeaderOfMessage(`Bcc`, `bob@example.com`),
			]);
		}).toThrow(`Multiple Bcc headers are not allowed.`);
		return;
	});
	await test(`throws on duplicate Cc`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeDestinationAddressFields(): void {
			computeDestinationAddressFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`Cc`, `alice@example.com`),
				new HeaderOfMessage(`Cc`, `bob@example.com`),
			]);
		}).toThrow(`Multiple Cc headers are not allowed.`);
		return;
	});
	await test(`computes all destination headers when present`, async function executeTest(): Promise<void> {
		const computed = computeDestinationAddressFieldsOfHeadersOfMessage([
			new HeaderOfMessage(`Bcc`, `alice@example.com`),
			new HeaderOfMessage(`Cc`, `bob@example.com`),
			new HeaderOfMessage(`To`, `carol@example.com`),
		]);
		expect(Array.from(computed.headerify())).toStrictEqual([
			new HeaderOfMessage(`To`, `carol@example.com`),
			new HeaderOfMessage(`Cc`, `bob@example.com`),
			new HeaderOfMessage(`Bcc`, `alice@example.com`),
		]);
		return;
	});
});
