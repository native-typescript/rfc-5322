import type {HeaderOfMessage} from "../../../header/index.ts";
import type {FieldsOfHeadersOfMessage} from "../../FieldsOfHeadersOfMessage.ts";
import type {SupportedBlockOfResentFieldsOfHeadersOfMessage} from "./block/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.6
 */
export class ResentFieldsOfHeadersOfMessage implements FieldsOfHeadersOfMessage {
	public constructor(
		...blocks: readonly SupportedBlockOfResentFieldsOfHeadersOfMessage[]
	) {
		this.blocks = blocks;
	}
	public readonly blocks: readonly SupportedBlockOfResentFieldsOfHeadersOfMessage[];
	public *headerify(): Generator<HeaderOfMessage, void, void> {
		for (const block of this.blocks) {
			const headers: Iterable<HeaderOfMessage, void, void> = block.headerify();
			for (const header of headers) {
				yield header;
				continue;
			}
			continue;
		}
		return;
	}
}
