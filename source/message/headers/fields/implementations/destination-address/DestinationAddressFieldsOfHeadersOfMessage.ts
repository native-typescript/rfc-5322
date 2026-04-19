import type {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {Bcc} from "./bcc/index.ts";
import type {Cc} from "./cc/index.ts";
import type {To} from "./to/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.3
 */
export class DestinationAddressFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(bcc: Bcc | null, cc: Cc | null, to: null | To) {
		this.bcc = bcc;
		this.cc = cc;
		this.to = to;
	}
	public readonly bcc: Bcc | null;
	public readonly cc: Cc | null;
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		if (this.to !== null) {
			const header: HeaderOfMessage = this.to.headerify();
			yield header;
		}
		if (this.cc !== null) {
			const header: HeaderOfMessage = this.cc.headerify();
			yield header;
		}
		if (this.bcc !== null) {
			const header: HeaderOfMessage = this.bcc.headerify();
			yield header;
		}
		return;
	}
	public readonly to: null | To;
}
