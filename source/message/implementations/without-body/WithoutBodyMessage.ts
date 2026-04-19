import type {HeadersOfMessage} from "../../headers/index.ts";
import type {Message} from "../../Message.ts";
export class WithoutBodyMessage implements Message {
	public constructor(headers: HeadersOfMessage) {
		this.headers = headers;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-2.2
	 */
	public readonly headers: HeadersOfMessage;
	public serialize(): `${string}\r
` {
		const serializedHeadersOfThis: string = this.headers.serialize();
		const serializedThis: `${string}\r
` = `${serializedHeadersOfThis}\r
`;
		return serializedThis;
	}
}
