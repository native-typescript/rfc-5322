import type {HeadersOfMessage} from "./headers/index.ts";
import type {Serializable} from "./serializable/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322
 */
export interface Message extends Serializable {
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-2.2
	 */
	readonly headers: HeadersOfMessage;
}
