import type {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.8
 */
export class OptionalFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(...headers: readonly HeaderOfMessage[]) {
		this.headers = headers;
	}
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		for (const header of this.headers) {
			yield header;
			continue;
		}
		return;
	}
	public readonly headers: readonly HeaderOfMessage[];
}
