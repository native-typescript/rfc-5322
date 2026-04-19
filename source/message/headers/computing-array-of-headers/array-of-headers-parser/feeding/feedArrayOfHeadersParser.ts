import type {ArrayOfHeadersParser} from "../ArrayOfHeadersParser.ts";
export function feedArrayOfHeadersParser(
	parser: ArrayOfHeadersParser,
	character: string,
): ArrayOfHeadersParser {
	switch (character) {
		case `:`: {
			const updatedParser: ArrayOfHeadersParser =
				parser.feedWithColon(character);
			return updatedParser;
		}
		case `\n`: {
			const updatedParser: ArrayOfHeadersParser =
				parser.feedWithLineFeed(character);
			return updatedParser;
		}
		case `\r`: {
			const updatedParser: ArrayOfHeadersParser =
				parser.feedWithCarriageReturn(character);
			return updatedParser;
		}
		case `\t`: {
			const updatedParser: ArrayOfHeadersParser = parser.feedWithTab(character);
			return updatedParser;
		}
		case ` `: {
			const updatedParser: ArrayOfHeadersParser =
				parser.feedWithSpace(character);
			return updatedParser;
		}
		default: {
			const updatedParser: ArrayOfHeadersParser =
				parser.feedWithOther(character);
			return updatedParser;
		}
	}
}
