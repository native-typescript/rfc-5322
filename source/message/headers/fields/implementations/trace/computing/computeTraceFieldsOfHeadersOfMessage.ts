import {createAngleAddrFromStringUnsafely} from "../../../../address-specification/index.ts";
import type {HeaderOfMessage} from "../../../../header/index.ts";
import {
	EmptyTraceFieldsOfHeadersOfMessage,
	NonEmptyTraceFieldsOfHeadersOfMessage,
	type Path,
	Received,
	Return,
} from "../implementations/index.ts";
import type {SupportedTraceFieldsOfHeadersOfMessage} from "../supported/index.ts";
export function computeTraceFieldsOfHeadersOfMessage(
	headers: Iterable<HeaderOfMessage, void, void>,
): SupportedTraceFieldsOfHeadersOfMessage {
	let receiveds: [Received, ...(readonly Received[])] | null = null;
	let return_: null | Return = null;
	for (const header of headers) {
		switch (header.name) {
			case `Return-Path`: {
				if (return_ === null) {
					const pathOfReturn: Path = createAngleAddrFromStringUnsafely(
						header.value,
					);
					return_ = new Return(pathOfReturn);
					continue;
				} else {
					const error: Error = new Error(
						`Multiple Return-Path headers are not allowed.`,
					);
					throw error;
				}
			}
			case `Received`: {
				const indexOfLastSemicolon: number = header.value.lastIndexOf(`;`);
				if (indexOfLastSemicolon >= 1) {
					const receivedToken: string = header.value
						.slice(0, indexOfLastSemicolon)
						.trim();
					const dateText: string = header.value
						.slice(indexOfLastSemicolon + 1)
						.trim();
					if (receivedToken.length === 0 || dateText.length === 0) {
						const error: Error = new Error(`Invalid Received header format.`);
						throw error;
					} else {
						const dateOfReceived: Date = new Date(dateText);
						const received: Received = new Received(
							receivedToken,
							dateOfReceived,
						);
						if (receiveds === null) {
							receiveds = [received];
							continue;
						} else {
							receiveds.push(received);
							continue;
						}
					}
				} else {
					const error: Error = new Error(`Invalid Received header format.`);
					throw error;
				}
			}
			default: {
				continue;
			}
		}
	}
	if (receiveds === null) {
		if (return_ === null) {
			const traceFields: EmptyTraceFieldsOfHeadersOfMessage =
				new EmptyTraceFieldsOfHeadersOfMessage();
			return traceFields;
		} else {
			const error: Error = new Error(
				`A Received header is required when Return-Path header is present.`,
			);
			throw error;
		}
	} else {
		const traceFields: NonEmptyTraceFieldsOfHeadersOfMessage =
			new NonEmptyTraceFieldsOfHeadersOfMessage(return_, receiveds);
		return traceFields;
	}
}
