import type {FieldOfHeadersOfMessage} from "../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../header/index.ts";
import type {Phrase} from "../../../../phrase/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.5
 */
export class Keywords implements FieldOfHeadersOfMessage {
	public constructor(...phrases: readonly [Phrase, ...(readonly Phrase[])]) {
		this.phrases = phrases;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Keywords`,
			this.phrases
				.map<string>(function serializePhrase(phrase: Phrase): string {
					const serializedPhrase: string = phrase.serialize();
					return serializedPhrase;
				})
				.join(`,`),
		);
		return header;
	}
	public readonly phrases: readonly [Phrase, ...(readonly Phrase[])];
}
