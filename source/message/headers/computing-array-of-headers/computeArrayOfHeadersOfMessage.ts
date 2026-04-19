import type {HeaderOfMessage} from "../header/index.ts";
import {
	type ArrayOfHeadersParser,
	feedArrayOfHeadersParser,
	HeaderNameArrayOfHeadersParser,
} from "./array-of-headers-parser/index.ts";
import {sanitizeHeaderOfMessage} from "./sanitizing/index.ts";
export function computeArrayOfHeadersOfMessage(
	headersAsString: string,
): readonly HeaderOfMessage[] {
	let currentParser: ArrayOfHeadersParser = new HeaderNameArrayOfHeadersParser(
		[],
		``,
	);
	for (const character of headersAsString) {
		currentParser = feedArrayOfHeadersParser(currentParser, character);
		continue;
	}
	const arrayOfHeaders: readonly HeaderOfMessage[] = currentParser
		.finalize()
		.map<HeaderOfMessage>(function sanitizeHeader(
			header: HeaderOfMessage,
		): HeaderOfMessage {
			const sanitizedHeader: HeaderOfMessage = sanitizeHeaderOfMessage(header);
			return sanitizedHeader;
		});
	return arrayOfHeaders;
}
