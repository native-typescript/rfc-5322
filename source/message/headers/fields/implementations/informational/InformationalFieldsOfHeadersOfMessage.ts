import type {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {Comments} from "./comments/index.ts";
import type {Keywords} from "./keywords/index.ts";
import type {Subject} from "./subject/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.5
 */
export class InformationalFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(
		commentses: null | readonly [Comments, ...(readonly Comments[])],
		keywordses: null | readonly [Keywords, ...(readonly Keywords[])],
		subject: null | Subject,
	) {
		this.commentses = commentses;
		this.keywordses = keywordses;
		this.subject = subject;
	}
	public readonly commentses:
		| null
		| readonly [Comments, ...(readonly Comments[])];
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		if (this.commentses !== null) {
			for (const comment of this.commentses) {
				const header: HeaderOfMessage = comment.headerify();
				yield header;
				continue;
			}
		}
		if (this.keywordses !== null) {
			for (const keyword of this.keywordses) {
				const header: HeaderOfMessage = keyword.headerify();
				yield header;
				continue;
			}
		}
		if (this.subject !== null) {
			const header: HeaderOfMessage = this.subject.headerify();
			yield header;
		}
		return;
	}
	public readonly keywordses:
		| null
		| readonly [Keywords, ...(readonly Keywords[])];
	public readonly subject: null | Subject;
}
