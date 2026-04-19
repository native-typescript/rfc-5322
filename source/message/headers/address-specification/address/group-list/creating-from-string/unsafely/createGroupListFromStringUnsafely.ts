import type {SupportedGroupList} from "../../supported/index.ts";
import {createGroupListFromStringSafely} from "../safely/index.ts";
export function createGroupListFromStringUnsafely(
	string: string,
): SupportedGroupList {
	const groupList: null | SupportedGroupList =
		createGroupListFromStringSafely(string);
	if (groupList === null) {
		const error: Error = new Error(`Invalid group-list format.`);
		throw error;
	} else {
		return groupList;
	}
}
