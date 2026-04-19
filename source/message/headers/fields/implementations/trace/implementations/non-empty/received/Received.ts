import type {DateTime} from "../../../../../../date-time/index.ts";
import type {FieldOfHeadersOfMessage} from "../../../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../../../header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.7
 */
export class Received implements FieldOfHeadersOfMessage {
	public constructor(receivedTokens: string, dateTime: DateTime) {
		this.dateTime = dateTime;
		this.receivedTokens = receivedTokens;
	}
	public readonly dateTime: DateTime;
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Received`,
			`${this.receivedTokens};${this.dateTime.toUTCString()}`,
		);
		return header;
	}
	public readonly receivedTokens: string;
}
