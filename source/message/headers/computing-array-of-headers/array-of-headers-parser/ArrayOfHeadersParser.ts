import type {HeaderOfMessage} from "../../header/index.ts";
export interface ArrayOfHeadersParser {
	feedWithCarriageReturn(character: `\r`): ArrayOfHeadersParser;
	feedWithColon(character: `:`): ArrayOfHeadersParser;
	feedWithLineFeed(character: `\n`): ArrayOfHeadersParser;
	feedWithOther(character: string): ArrayOfHeadersParser;
	feedWithSpace(character: ` `): ArrayOfHeadersParser;
	feedWithTab(character: `\t`): ArrayOfHeadersParser;
	finalize(): readonly HeaderOfMessage[];
}
