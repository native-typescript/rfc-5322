import type {Group} from "../../Group.ts";
import {createGroupFromStringSafely} from "../safely/index.ts";
export function createGroupFromStringUnsafely(string: string): Group {
	const group: Group | null = createGroupFromStringSafely(string);
	if (group === null) {
		const error: Error = new Error(`Invalid group string.`);
		throw error;
	} else {
		return group;
	}
}
