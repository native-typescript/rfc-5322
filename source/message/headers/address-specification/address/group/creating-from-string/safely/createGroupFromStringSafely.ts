import {
	createGroupListFromStringSafely,
	type SupportedGroupList,
} from "../../../group-list/index.ts";
import type {Group} from "../../Group.ts";
import {
	WithGroupListGroup,
	WithoutGroupListGroup,
} from "../../implementations/index.ts";
import rfc2047 from "rfc2047";
export function createGroupFromStringSafely(string: string): Group | null {
	/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
	const match = /^(?<displayName>[^:;]+):(?<groupList>[^:;]+)?;$/u.exec(
		string,
	) as
		| null
		| (RegExpExecArray & {
				groups: {displayName: string; groupList: string | undefined};
		  });
	if (match === null) {
		return null;
	} else {
		const displayNameOfGroup: string = rfc2047.decode(
			match.groups.displayName.trim(),
		);
		if (match.groups.groupList === undefined) {
			const group: WithoutGroupListGroup = new WithoutGroupListGroup(
				displayNameOfGroup,
			);
			return group;
		} else {
			const groupListOfGroup: null | SupportedGroupList =
				createGroupListFromStringSafely(match.groups.groupList);
			if (groupListOfGroup === null) {
				return null;
			} else {
				const group: WithGroupListGroup = new WithGroupListGroup(
					displayNameOfGroup,
					groupListOfGroup,
				);
				return group;
			}
		}
	}
}
