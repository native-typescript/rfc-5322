import {
	createHeadersOfMessageFromStringUnsafely,
	type HeadersOfMessage,
} from "../../headers/index.ts";
import {
	WithBodyMessage,
	WithoutBodyMessage,
} from "../../implementations/index.ts";
import type {Message} from "../../Message.ts";
export function createMessageFromStringUnsafely(string: string): Message {
	const regex: RegExp = /^(?<headers>.*?)(?<=\r\n)\r\n(?<body>.+)?$/su;
	const match:
		| null
		| (RegExpMatchArray & {
				readonly groups: {
					readonly body: string | undefined;
					readonly headers: string;
				};
				/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		  }) = regex.exec(string) as
		| null
		| (RegExpMatchArray & {
				readonly groups: {
					readonly body: string | undefined;
					readonly headers: string;
				};
		  });
	if (match === null) {
		const error: Error = new Error(`Invalid RFC 5322 message format.`);
		throw error;
	} else {
		const headersOfMessage: HeadersOfMessage =
			createHeadersOfMessageFromStringUnsafely(match.groups.headers);
		if (match.groups.body === undefined) {
			const rfc5322Message: WithoutBodyMessage = new WithoutBodyMessage(
				headersOfMessage,
			);
			return rfc5322Message;
		} else {
			const rfc5322Message: WithBodyMessage = new WithBodyMessage(
				headersOfMessage,
				match.groups.body,
			);
			return rfc5322Message;
		}
	}
}
