import {HeaderOfMessage} from "../../../../header/index.ts";
import type {ArrayOfHeadersParser} from "../../ArrayOfHeadersParser.ts";
import {HeaderNameArrayOfHeadersParser} from "../header-name/index.ts";
import {HeaderValueArrayOfHeadersParser} from "../header-value/index.ts";
export class AfterLineFeedArrayOfHeadersParser implements ArrayOfHeadersParser {
	public constructor(
		arrayOfHeaders: readonly HeaderOfMessage[],
		headerName: string,
		headerValue: string,
		carriageReturn: `\r`,
		lineFeed: `\n`,
	) {
		this.arrayOfHeaders = arrayOfHeaders;
		this.headerName = headerName;
		this.headerValue = headerValue;
		this.carriageReturn = carriageReturn;
		this.lineFeed = lineFeed;
	}
	private readonly arrayOfHeaders: readonly HeaderOfMessage[];
	private readonly carriageReturn: `\r`;
	public feedWithCarriageReturn(character: `\r`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterLineFeedArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithColon(character: `:`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterLineFeedArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithLineFeed(character: `\n`): never {
		const error: Error = new Error(
			`Unexpected character "${character}" in AfterLineFeedArrayOfHeadersParser.`,
		);
		throw error;
	}
	public feedWithOther(character: string): HeaderNameArrayOfHeadersParser {
		const updatedParser: HeaderNameArrayOfHeadersParser =
			new HeaderNameArrayOfHeadersParser(
				[
					...this.arrayOfHeaders,
					new HeaderOfMessage(this.headerName, this.headerValue),
				],
				character,
			);
		return updatedParser;
	}
	public feedWithSpace(character: ` `): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${this.carriageReturn}${this.lineFeed}${character}`,
			);
		return updatedParser;
	}
	public feedWithTab(character: `\t`): HeaderValueArrayOfHeadersParser {
		const updatedParser: HeaderValueArrayOfHeadersParser =
			new HeaderValueArrayOfHeadersParser(
				this.arrayOfHeaders,
				this.headerName,
				`${this.headerValue}${this.carriageReturn}${this.lineFeed}${character}`,
			);
		return updatedParser;
	}
	public finalize(): readonly [
		...(readonly HeaderOfMessage[]),
		HeaderOfMessage,
	] {
		const result: readonly [...(readonly HeaderOfMessage[]), HeaderOfMessage] =
			[
				...this.arrayOfHeaders,
				new HeaderOfMessage(
					this.headerName,
					`${this.headerValue}${this.carriageReturn}${this.lineFeed}`,
				),
			];
		return result;
	}
	private readonly headerName: string;
	private readonly headerValue: string;
	private readonly lineFeed: `\n`;
}
