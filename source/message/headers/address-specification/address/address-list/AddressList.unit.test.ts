import {AngleAddr} from "../../angle-addr/index.ts";
import {AddrSpec} from "../addr-spec/index.ts";
import {WithJustOneMailboxGroupList} from "../group-list/index.ts";
import {WithGroupListGroup} from "../group/index.ts";
import {WithDisplayNameNameAddr} from "../name-addr/index.ts";
import {AddressList} from "./AddressList.ts";
import {
	createAddressListFromStringSafely,
	createAddressListFromStringUnsafely,
} from "./creating-from-string/index.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
import rfc2047 from "rfc2047";
await describe(`AddressList`, async function executeTests(): Promise<void> {
	await test(`iterateAddrSpecs yields addr specs in order`, async function executeTest(): Promise<void> {
		const addressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
			new WithGroupListGroup(
				`Team`,
				new WithJustOneMailboxGroupList(
					new WithDisplayNameNameAddr(
						`Bob`,
						new AngleAddr(new AddrSpec(`bob`, `example.com`)),
					),
				),
			),
		);
		expect(Array.from(addressList.iterateAddrSpecs())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new AddrSpec(`bob`, `example.com`),
		]);
		return;
	});
	await test(`iterateMailboxes yields mailboxes in order`, async function executeTest(): Promise<void> {
		const addressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
			new WithGroupListGroup(
				`Team`,
				new WithJustOneMailboxGroupList(
					new WithDisplayNameNameAddr(
						`Bob`,
						new AngleAddr(new AddrSpec(`bob`, `example.com`)),
					),
				),
			),
		);
		expect(Array.from(addressList.iterateMailboxes())).toStrictEqual([
			new AddrSpec(`alice`, `example.com`),
			new WithDisplayNameNameAddr(
				`Bob`,
				new AngleAddr(new AddrSpec(`bob`, `example.com`)),
			),
		]);
		return;
	});
	await test(`append returns a new address list with extra item`, async function executeTest(): Promise<void> {
		const sourceAddressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
		);
		const appendedAddressList: AddressList = sourceAddressList.append(
			new AddrSpec(`bob`, `example.com`),
		);
		expect(appendedAddressList).toStrictEqual(
			new AddressList(
				new AddrSpec(`alice`, `example.com`),
				new AddrSpec(`bob`, `example.com`),
			),
		);
		return;
	});
	await test(`serialize joins addresses with comma`, async function executeTest(): Promise<void> {
		const addressList = new AddressList(
			new WithDisplayNameNameAddr(
				`Jöhn Doe`,
				new AngleAddr(new AddrSpec(`john`, `example.com`)),
			),
			new AddrSpec(`alice`, `example.com`),
		);
		const expectedString = `${rfc2047.encode(`Jöhn Doe`)}<john@example.com>,alice@example.com`;
		expect(addressList.serialize()).toStrictEqual(expectedString);
		return;
	});
	await test(`stringify joins addresses with comma`, async function executeTest(): Promise<void> {
		const addressList = new AddressList(
			new WithDisplayNameNameAddr(
				`Jöhn Doe`,
				new AngleAddr(new AddrSpec(`john`, `example.com`)),
			),
			new AddrSpec(`alice`, `example.com`),
		);
		const expectedString = `Jöhn Doe<john@example.com>,alice@example.com`;
		expect(addressList.stringify()).toStrictEqual(expectedString);
		return;
	});
	await test(`createFromStringSafely returns null for invalid input`, async function executeTest(): Promise<void> {
		const createdAddressList: AddressList | null =
			createAddressListFromStringSafely(`not-an-address`);
		expect(createdAddressList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null for empty input`, async function executeTest(): Promise<void> {
		const createdAddressList: AddressList | null =
			createAddressListFromStringSafely(``);
		expect(createdAddressList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns null for invalid trailing address`, async function executeTest(): Promise<void> {
		const createdAddressList: AddressList | null =
			createAddressListFromStringSafely(`alice@example.com,not-an-address`);
		expect(createdAddressList).toBeNull();
		return;
	});
	await test(`createFromStringSafely returns address-list for valid input`, async function executeTest(): Promise<void> {
		const createdAddressList: AddressList | null =
			createAddressListFromStringSafely(
				`alice@example.com,Bob <bob@example.com>`,
			);
		const expectedAddressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
			new WithDisplayNameNameAddr(
				`Bob`,
				new AngleAddr(new AddrSpec(`bob`, `example.com`)),
			),
		);
		expect(createdAddressList).toStrictEqual(expectedAddressList);
		return;
	});
	await test(`createFromStringUnsafely throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateAddressListFromString(): void {
			createAddressListFromStringUnsafely(`not-an-address`);
		}).toThrow(`Invalid address-list format`);
		return;
	});
	await test(`createFromStringUnsafely returns address-list for valid input`, async function executeTest(): Promise<void> {
		const createdAddressList: AddressList = createAddressListFromStringUnsafely(
			`alice@example.com,Bob <bob@example.com>`,
		);
		const expectedAddressList: AddressList = new AddressList(
			new AddrSpec(`alice`, `example.com`),
			new WithDisplayNameNameAddr(
				`Bob`,
				new AngleAddr(new AddrSpec(`bob`, `example.com`)),
			),
		);
		expect(createdAddressList).toStrictEqual(expectedAddressList);
		return;
	});
	return;
});
