import {AngleAddr} from "../../../../angle-addr/index.ts";
import {AddrSpec} from "../../../addr-spec/index.ts";
import {
	WithDisplayNameNameAddr,
	WithoutDisplayNameNameAddr,
} from "../../implementations/index.ts";
import type {NameAddr} from "../../NameAddr.ts";
import {createNameAddrFromStringUnsafely} from "../unsafely/index.ts";
import {createNameAddrFromStringSafely} from "./createNameAddrFromStringSafely.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`createNameAddrFromStringSafely`, async function executeTests(): Promise<void> {
	await test(`returns null when string has no angle-addr`, async function executeTest(): Promise<void> {
		expect(createNameAddrFromStringSafely(`john@example.com`)).toBeNull();
		return;
	});
	await test(`parses name-addr without display name`, async function executeTest(): Promise<void> {
		const createdNameAddr: NameAddr | null =
			createNameAddrFromStringSafely(`<john@example.com>`);
		expect(createdNameAddr).toStrictEqual(
			new WithoutDisplayNameNameAddr(
				new AngleAddr(new AddrSpec(`john`, `example.com`)),
			),
		);
		return;
	});
	await test(`parses and decodes display name`, async function executeTest(): Promise<void> {
		const createdNameAddr: NameAddr | null = createNameAddrFromStringSafely(
			`=?UTF-8?B?SsO2aG4=?= <john@example.com>`,
		);
		expect(createdNameAddr).toStrictEqual(
			new WithDisplayNameNameAddr(
				`Jöhn`,
				new AngleAddr(new AddrSpec(`john`, `example.com`)),
			),
		);
		return;
	});
});
await describe(`createNameAddrFromStringUnsafely`, async function executeTests(): Promise<void> {
	await test(`throws for invalid input`, async function executeTest(): Promise<void> {
		expect(function attemptToCreateNameAddr(): void {
			createNameAddrFromStringUnsafely(`john@example.com`);
		}).toThrow(`Invalid name-addr string.`);
		return;
	});
	await test(`returns name-addr for valid input`, async function executeTest(): Promise<void> {
		const createdNameAddr: NameAddr = createNameAddrFromStringUnsafely(
			`John <john@example.com>`,
		);
		expect(createdNameAddr).toStrictEqual(
			new WithDisplayNameNameAddr(
				`John`,
				new AngleAddr(new AddrSpec(`john`, `example.com`)),
			),
		);
		return;
	});
});
