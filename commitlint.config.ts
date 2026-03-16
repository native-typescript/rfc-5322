import type {UserConfig} from "@commitlint/types";
export default {
	defaultIgnores: true,
	extends: [],
	ignores: [],
	parserPreset: {
		parserOpts: {
			headerCorrespondence: [`type`, `scope`, `subject`],
			headerPattern:
				/^(?<type>[^(!:\n]*)(?:\((?<scope>[^)]+)\))?!?: (?<subject>[^\n]*)$/u,
		},
	},
	rules: {
		"body-full-stop": [2, `always`, `.`],
		"body-leading-blank": [2, `always`],
		"body-max-length": [1, `always`, Infinity],
		"body-max-line-length": [1, `always`, Infinity],
		"footer-empty": [2, `always`],
		"footer-leading-blank": [2, `always`],
		"footer-max-length": [1, `always`, Infinity],
		"footer-max-line-length": [1, `always`, Infinity],
		"header-max-length": [1, `always`, Infinity],
		"header-trim": [2, `always`],
		"references-empty": [2, `always`],
		"scope-case": [2, `always`, `lower-case`],
		"scope-empty": [2, `always`],
		"scope-enum": [2, `always`, []],
		"scope-max-length": [1, `always`, Infinity],
		"subject-empty": [2, `never`],
		"subject-max-length": [1, `always`, Infinity],
		"type-case": [2, `always`, `lower-case`],
		"type-empty": [2, `never`],
		"type-enum": [2, `always`, [`chore`, `feature`, `release`]],
		"type-max-length": [1, `always`, Infinity],
	},
} as const satisfies UserConfig;
