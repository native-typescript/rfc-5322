import type {
	WithJustOneMailboxGroupList,
	WithMoreThanOneMailboxGroupList,
} from "../implementations/index.ts";
export type SupportedGroupList =
	| WithJustOneMailboxGroupList
	| WithMoreThanOneMailboxGroupList;
