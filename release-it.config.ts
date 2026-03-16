import type {Config} from "release-it";
export default {
	git: {
		commit: true,
		commitArgs: [],
		commitMessage: `release: \${version}`,
		push: true,
		pushArgs: [],
		tag: true,
		tagArgs: [],
	},
	github: {release: true, releaseName: `\${version}`},
	hooks: {},
	npm: {publish: false, publishPackageManager: `npm`},
	plugins: {
		"@release-it/conventional-changelog": {
			ignoreRecommendedBump: false,
			preset: {
				header: `# Changelog`,
				name: `conventionalcommits`,
				releaseCommitMessageFormat: `release: {{currentTag}}`,
				types: [
					{hidden: false, section: `Chores`, type: `chore`},
					{hidden: false, section: `Features`, type: `feature`},
					{hidden: true, section: `Releases`, type: `release`},
				],
			},
			strictSemVer: false,
		},
	},
} as const satisfies Config;
