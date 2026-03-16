# RFC 5322

## File structure

- .devcontainer - Configuration of [Development Containers](https://containers.dev);
- .git - Metadata of the [Git](https://git-scm.com) repository;
- .github - Configuration of [GitHub](https://github.com);
- [.gitignore](https://git-scm.com/docs/gitignore);
- [.prettierignore](https://prettier.io/docs/ignore.html);
- [.vscode](https://code.visualstudio.com/docs/configure/settings#_workspace-settings) - Configuration of [Visual Studio Code](https://code.visualstudio.com);
- [commitlint.config.ts](https://commitlint.js.org/reference/configuration.html#config-via-file) - Configuration of [commitlint](https://commitlint.js.org);
- [CONTRIBUTING.md](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors);
- [eslint.config.ts](https://eslint.org/docs/latest/use/configure/configuration-files) - Configuration of [ESLint](https://eslint.org);
- node_modules - [Node.js](https://nodejs.org) dependencies;
- [package-lock.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json) - [npm](https://www.npmjs.com) lock;
- [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) - Configuration of the [Node.js](https://nodejs.org) project;
- [prettier.config.ts](https://prettier.io/docs/configuration) - Configuration of [Prettier](https://prettier.io);
- [README.md](https://en.wikipedia.org/wiki/README);
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Configuration of [TypeScript](https://www.typescriptlang.org);

## Development setup

1. Use a [Development Containers](https://containers.dev)-compatible editor to
   open the project. The editor will automatically set up a development
   environment with all the necessary dependencies and tools;
2. Connect to the development container;

## Developing

### commitlint

[commitlint](https://commitlint.js.org) is used for linting commit messages.

#### Last commit

Run

```
npm run commitlint:check:last
```

to lint the latest commit message.

#### Range of commits

Run

```
npm run commitlint:check:range -- --from=${FROM} --to=${TO}
```

to lint the commit messages in the specified range. The `FROM` and `TO` variables are commit references that specify the range of commits to lint.

### ESLint

[ESLint](https://eslint.org) is used for linting.

#### Checking

Run

```
npm run eslint:check
```

to perform linting. You should also have your editor set up to display the issues in your editor as you code.

#### Fixing

Run

```
npm run eslint:fix
```

to automatically fix linting issues in the codebase where possible.

### Prettier

[Prettier](https://prettier.io) is used for code formatting.

#### Checking

Run

```
npm run prettier:check
```

to perform format checking.

#### Fixing

Run

```
npm run prettier:fix
```

to automatically format the codebase. You should have your editor set up to format on save as well.

### TypeScript

[TypeScript](https://www.typescriptlang.org) is used for development.

#### Checking

Run

```
npm run typescript:check
```

to perform type checking.
