import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.5
 */
export class Subject implements FieldOfHeadersOfMessage {
	public constructor(unstructured: string) {
		this.unstructured = unstructured;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Subject`,
			this.unstructured,
		);
		return header;
	}
	public readonly unstructured: string;
}
