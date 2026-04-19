import type {Serializable} from "../serializable/index.ts";
import type {OrigDate} from "./field/index.ts";
import type {
	DestinationAddressFieldsOfHeadersOfMessage,
	IdentificationFieldsOfHeadersOfMessage,
	InformationalFieldsOfHeadersOfMessage,
	OptionalFieldsOfHeadersOfMessage,
	ResentFieldsOfHeadersOfMessage,
	SupportedOriginatorFieldsOfHeadersOfMessage,
	SupportedTraceFieldsOfHeadersOfMessage,
} from "./fields/index.ts";
import type {HeaderOfMessage} from "./header/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc5322#section-2.2
 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6
 */
export class HeadersOfMessage implements Serializable {
	public constructor(
		destinationAddress: DestinationAddressFieldsOfHeadersOfMessage,
		identification: IdentificationFieldsOfHeadersOfMessage,
		informational: InformationalFieldsOfHeadersOfMessage,
		optional: OptionalFieldsOfHeadersOfMessage,
		originationDate: OrigDate,
		originator: SupportedOriginatorFieldsOfHeadersOfMessage,
		resent: ResentFieldsOfHeadersOfMessage,
		trace: SupportedTraceFieldsOfHeadersOfMessage,
	) {
		this.destinationAddress = destinationAddress;
		this.identification = identification;
		this.informational = informational;
		this.optional = optional;
		this.originationDate = originationDate;
		this.originator = originator;
		this.resent = resent;
		this.trace = trace;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.3
	 */
	public readonly destinationAddress: DestinationAddressFieldsOfHeadersOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4
	 */
	public readonly identification: IdentificationFieldsOfHeadersOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.5
	 */
	public readonly informational: InformationalFieldsOfHeadersOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.8
	 */
	public readonly optional: OptionalFieldsOfHeadersOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.1
	 */
	public readonly originationDate: OrigDate;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.2
	 */
	public readonly originator: SupportedOriginatorFieldsOfHeadersOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.6
	 */
	public readonly resent: ResentFieldsOfHeadersOfMessage;
	public serialize(): string {
		const arrayOfHeaders: readonly HeaderOfMessage[] = [
			...this.destinationAddress.headerify(),
			...this.identification.headerify(),
			...this.informational.headerify(),
			...this.optional.headerify(),
			this.originationDate.headerify(),
			...this.originator.headerify(),
			...this.resent.headerify(),
			...this.trace.headerify(),
		];
		const serializedThis: string = arrayOfHeaders
			.map<string>(function serializeHeader(header: HeaderOfMessage): string {
				const serializedHeader = `${header.serialize()}\r
`;
				return serializedHeader;
			})
			.join(``);
		return serializedThis;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.7
	 */
	public readonly trace: SupportedTraceFieldsOfHeadersOfMessage;
}
