import type {HeaderOfMessage} from "../../../../header/index.ts";
import {Phrase} from "../../../../phrase/index.ts";
import {Comments} from "../comments/index.ts";
import {InformationalFieldsOfHeadersOfMessage} from "../InformationalFieldsOfHeadersOfMessage.ts";
import {Keywords} from "../keywords/index.ts";
import {Subject} from "../subject/index.ts";
import rfc2047 from "rfc2047";
export function computeInformationalFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): InformationalFieldsOfHeadersOfMessage {
	let comments: [Comments, ...(readonly Comments[])] | null = null;
	let keywords: [Keywords, ...(readonly Keywords[])] | null = null;
	let subject: null | Subject = null;
	for (const header of headers) {
		switch (header.name) {
			case `Comments`: {
				const decodedComment: string = rfc2047.decode(header.value);
				const comment: Comments = new Comments(decodedComment);
				if (comments === null) {
					comments = [comment];
					continue;
				} else {
					comments = [...comments, comment];
					continue;
				}
			}
			case `Keywords`: {
				const keywordValues: readonly string[] = header.value
					.split(`,`)
					.map<string>(function trimKeywordValue(keywordValue: string): string {
						const trimmedKeywordValue: string = keywordValue.trim();
						return trimmedKeywordValue;
					});
				const [firstKeywordValue, ...restKeywordValues] = keywordValues;
				if (firstKeywordValue === undefined || firstKeywordValue === ``) {
					const error: Error = new Error(`Invalid Keywords header format`);
					throw error;
				} else {
					const keywordPhrases: [Phrase, ...(readonly Phrase[])] = [
						new Phrase(rfc2047.decode(firstKeywordValue)),
					];
					for (const restKeywordValue of restKeywordValues) {
						if (restKeywordValue === ``) {
							const error: Error = new Error(`Invalid Keywords header format`);
							throw error;
						}
						keywordPhrases.push(new Phrase(rfc2047.decode(restKeywordValue)));
						continue;
					}
					const keyword: Keywords = new Keywords(keywordPhrases);
					if (keywords === null) {
						keywords = [keyword];
						continue;
					} else {
						keywords = [...keywords, keyword];
						continue;
					}
				}
			}
			case `Subject`: {
				if (subject === null) {
					subject = new Subject(rfc2047.decode(header.value));
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Subject headers are not allowed`,
					);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	const informationalFields: InformationalFieldsOfHeadersOfMessage =
		new InformationalFieldsOfHeadersOfMessage(comments, keywords, subject);
	return informationalFields;
}
