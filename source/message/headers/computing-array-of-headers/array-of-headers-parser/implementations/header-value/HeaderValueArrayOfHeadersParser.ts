import type {HeaderOfMessage} from "../../../../header/index.ts";
import type {ArrayOfHeadersParser} from "../../ArrayOfHeadersParser.ts";
import {AfterCarriageReturnArrayOfHeadersParser} from "../after-carriage-return/index.ts";
export class HeaderValueArrayOfHeadersParser implements ArrayOfHeadersParser {
	public constructor(
		arrayOfHeaders: readonly HeaderOfMessage[],
		headerName: string,
		headerValue: string,
	) {
		this.arrayOfHeaders = arrayOfHeaders;
		this.headerName = headerName;
		this.headerValue = headerValue;
	}
	private readonly arrayOfHeaders: readonly HeaderOfMessage[];
	public feedWithCarriageReturn(
		character: `\r`,
	): AfterCarriageReturnArrayOfHeadersParser {
		const updatedParser: AfterCarriageReturnArrayOfHeadersParser =
			new AfterCarriageReturnArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				this.headerValue,
				character,
			);
		return updatedParser;
	}
	public feedWithColon(character: `:`): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${character}`,
			);
		return updatedParser;
	}
	public feedWithLineFeed(character: `\n`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in HeaderValueArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithOther(character: string): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${character}`,
			);
		return updatedParser;
	}
	public feedWithSpace(character: ` `): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${character}`,
			);
		return updatedParser;
	}
	public feedWithTab(character: `\t`): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${character}`,
			);
		return updatedParser;
	}
	public finalize(): never {
		const error: Error = new Error(
			`Unexpected finalization in HeaderValueArrayOfHeadersParser.`,
		);
		throw error;
	}
	private readonly headerName: string;
	private readonly headerValue: string;
}
