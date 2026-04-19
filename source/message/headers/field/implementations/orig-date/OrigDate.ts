import {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldOfHeadersOfMessage} from "../../FieldOfHeadersOfMessage.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.3
 * Miliseconds are ignored.
 */
export class OrigDate implements FieldOfHeadersOfMessage {
	public constructor(value: Date) {
		this.value = value;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Date`,
			this.value.toUTCString(),
		);
		return header;
	}
	public readonly value: Date;
}
