import type {HeaderOfMessage} from "../../../../header/index.ts";
import type {ArrayOfHeadersParser} from "../../ArrayOfHeadersParser.ts";
import {AfterLineFeedArrayOfHeadersParser} from "../after-line-feed/index.ts";
export class AfterCarriageReturnArrayOfHeadersParser implements ArrayOfHeadersParser {
	public constructor(
		arrayOfHeaders: readonly HeaderOfMessage[],
		headerName: string,
		headerValue: string,
		carriageReturn: `\r`,
	) {
		this.arrayOfHeaders = arrayOfHeaders;
		this.headerName = headerName;
		this.headerValue = headerValue;
		this.carriageReturn = carriageReturn;
	}
	private readonly arrayOfHeaders: readonly HeaderOfMessage[];
	private readonly carriageReturn: `\r`;
	public feedWithCarriageReturn(character: `\r`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithColon(character: `:`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithLineFeed(character: `\n`): AfterLineFeedArrayOfHeadersParser {
		const updatedParser: AfterLineFeedArrayOfHeadersParser =
			new AfterLineFeedArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				this.headerValue,
				this.carriageReturn,
				character,
			);
		return updatedParser;
	}
	public feedWithOther(character: string): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithSpace(character: ` `): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithTab(character: `\t`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	public finalize(): never {
		const error: Error = new Error(
			`Unexpected finalization in AfterCarriageReturnArrayOfHeadersParser.`,
		);
		throw error;
	}
	private readonly headerName: string;
	private readonly headerValue: string;
}
