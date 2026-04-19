import {
	AddressList,
	AddrSpec,
} from "../../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
import {DestinationAddressFieldsOfHeadersOfMessage} from "../DestinationAddressFieldsOfHeadersOfMessage.ts";
import {To} from "../to/index.ts";
import {computeDestinationAddressFieldsOfHeadersOfMessage} from "./computeDestinationAddressFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`computeDestinationAddressFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`returns empty object when To is missing`, async function executeTest(): Promise<void> {
		const destinationAddress: DestinationAddressFieldsOfHeadersOfMessage =
			computeDestinationAddressFieldsOfHeadersOfMessage([]);
		expect(destinationAddress).toStrictEqual(
			new DestinationAddressFieldsOfHeadersOfMessage(null, null, null),
		);
		return;
	});
	await test(`returns destination address for a single To header`, async function executeTest(): Promise<void> {
		const destinationAddress: DestinationAddressFieldsOfHeadersOfMessage =
			computeDestinationAddressFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`To`, `alice@example.com`),
			]);
		const expectedAddressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
		);
		expect(destinationAddress).toStrictEqual(
			new DestinationAddressFieldsOfHeadersOfMessage(
				null,
				null,
				new To(expectedAddressList),
			),
		);
		return;
	});
	await test(`throws when multiple To headers are provided`, async function executeTest(): Promise<void> {
		expect(function attemptToComputeDestinationAddress(): void {
			computeDestinationAddressFieldsOfHeadersOfMessage([
				new HeaderOfMessage(`To`, `a@example.com`),
				new HeaderOfMessage(`To`, `b@example.com`),
			]);
		}).toThrow(`Multiple To headers are not allowed.`);
		return;
	});
	return;
});
