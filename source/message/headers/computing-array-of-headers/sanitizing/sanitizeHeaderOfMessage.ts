import {HeaderOfMessage} from "../../header/index.ts";
export function sanitizeHeaderOfMessage(
	header: HeaderOfMessage,
): HeaderOfMessage {
	const sanitizedHeader: HeaderOfMessage = new HeaderOfMessage(
		header.name,
		header.value.replaceAll(/\s+/gu, ` `).trim(),
	);
	return sanitizedHeader;
}
