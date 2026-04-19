import type {
	WithJustOneMailboxMailboxList,
	WithMoreThanOneMailboxMailboxList,
} from "../implementations/index.ts";
export type SupportedMailboxList =
	| WithJustOneMailboxMailboxList
	| WithMoreThanOneMailboxMailboxList;
