import {
	AddressList,
	AddrSpec,
	WithJustOneMailboxMailboxList,
} from "../../../../../../address-specification/index.ts";
import {HeaderOfMessage} from "../../../../../../header/index.ts";
import {MsgId} from "../../../../../../msg-id/index.ts";
import {WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage} from "./WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage`, async function executeTests(): Promise<void> {
	await test(`headerify yields all provided resent headers in expected order`, async function executeTest(): Promise<void> {
		const block =
			new WithJustOneMailboxInFromBlockOfResentFieldsOfHeadersOfMessage(
				new Date(`Wed, 2 Oct 2002 13:00:00 GMT`),
				new WithJustOneMailboxMailboxList(new AddrSpec(`from`, `example.com`)),
				new MsgId(`message`, `example.com`),
				new AddrSpec(`sender`, `example.com`),
				new AddressList(new AddrSpec(`to`, `example.com`)),
				new AddressList(new AddrSpec(`cc`, `example.com`)),
				new AddressList(new AddrSpec(`bcc`, `example.com`)),
			);
		expect(Array.from(block.headerify())).toStrictEqual([
			new HeaderOfMessage(`Resent-Date`, `Wed, 02 Oct 2002 13:00:00 GMT`),
			new HeaderOfMessage(`Resent-From`, `from@example.com`),
			new HeaderOfMessage(`Resent-Bcc`, `bcc@example.com`),
			new HeaderOfMessage(`Resent-Cc`, `cc@example.com`),
			new HeaderOfMessage(`Resent-Message-ID`, `<message@example.com>`),
			new HeaderOfMessage(`Resent-Sender`, `sender@example.com`),
			new HeaderOfMessage(`Resent-To`, `to@example.com`),
		]);
		return;
	});
});
