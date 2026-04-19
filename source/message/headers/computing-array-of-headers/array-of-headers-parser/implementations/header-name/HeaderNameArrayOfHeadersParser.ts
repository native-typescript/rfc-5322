import type {HeaderOfMessage} from "../../../../header/index.ts";
import type {ArrayOfHeadersParser} from "../../ArrayOfHeadersParser.ts";
import {HeaderValueArrayOfHeadersParser} from "../header-value/index.ts";
export class HeaderNameArrayOfHeadersParser implements ArrayOfHeadersParser {
	public constructor(
		arrayOfHeaders: readonly HeaderOfMessage[],
		headerName: string,
	) {
		this.arrayOfHeaders = arrayOfHeaders;
		this.headerName = headerName;
	}
	private readonly arrayOfHeaders: readonly HeaderOfMessage[];
	public feedWithCarriageReturn(character: `\r`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in HeaderNameArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithColon(character: `:`): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				``,
			);
		return updatedParser;
	}
	public feedWithLineFeed(character: `\n`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in HeaderNameArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithOther(character: string): HeaderNameArrayOfHeadersParser {
		const updatedParser: HeaderNameArrayOfHeadersParser =
			new HeaderNameArrayOfHeadersParser(
				this.arrayOfHeaders,
				`${this.headerName}${character}`,
			);
		return updatedParser;
	}
	public feedWithSpace(character: ` `): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in HeaderNameArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithTab(character: `\t`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in HeaderNameArrayOfHeadersParser.`,
		);
		throw error;
	}
	public finalize(): never {
		const error: Error = new Error(
			`Unexpected finalization in HeaderNameArrayOfHeadersParser.`,
		);
		throw error;
	}
	private readonly headerName: string;
}
