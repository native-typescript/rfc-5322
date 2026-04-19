import type {HeaderOfMessage} from "../header/index.ts";
export interface FieldsOfHeadersOfMessage {
	headerify(): IteratorObject<HeaderOfMessage, void, void>;
}
