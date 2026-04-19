import type {HeadersOfMessage} from "../../headers/index.ts";
import type {Message} from "../../Message.ts";
import type {BodyOfMessage} from "./body/index.ts";
export class WithBodyMessage implements Message {
	public constructor(headers: HeadersOfMessage, body: BodyOfMessage) {
		this.body = body;
		this.headers = headers;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-2.3
	 */
	public readonly body: BodyOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-2.2
	 */
	public readonly headers: HeadersOfMessage;
	public serialize(): `${string}\r
${string}` {
		const serializedHeadersOfThis: string = this.headers.serialize();
		const serializedThis: `${string}\r
${string}` = `${serializedHeadersOfThis}\r
${this.body}`;
		return serializedThis;
	}
}
