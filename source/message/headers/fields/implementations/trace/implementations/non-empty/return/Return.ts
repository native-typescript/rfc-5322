import type {FieldOfHeadersOfMessage} from "../../../../../../field/index.ts";
import {HeaderOfMessage} from "../../../../../../header/index.ts";
import type {Path} from "./path/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.7
 */
export class Return implements FieldOfHeadersOfMessage {
	public constructor(path: Path) {
		this.path = path;
	}
	public headerify(): HeaderOfMessage {
		const header: HeaderOfMessage = new HeaderOfMessage(
			`Return-Path`,
			this.path.serialize(),
		);
		return header;
	}
	public readonly path: Path;
}
