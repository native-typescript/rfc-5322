# RFC 5322

## File structure

- .devcontainer - Configuration of [Development Containers](https://containers.dev);
- .git - Metadata of the [Git](https://git-scm.com) repository;
- .github - Configuration of [GitHub](https://github.com);
- [.gitignore](https://git-scm.com/docs/gitignore);
- [.vscode](https://code.visualstudio.com/docs/configure/settings#_workspace-settings) - Configuration of [Visual Studio Code](https://code.visualstudio.com);
- [CONTRIBUTING.md](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors);
- [eslint.config.ts](https://eslint.org/docs/latest/use/configure/configuration-files) - Configuration of [ESLint](https://eslint.org);
- node_modules - [Node.js](https://nodejs.org) dependencies;
- [package-lock.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json) - [npm](https://www.npmjs.com) lock;
- [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) - Configuration of the [Node.js](https://nodejs.org) project;
- [README.md](https://en.wikipedia.org/wiki/README);
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) - Configuration of [TypeScript](https://www.typescriptlang.org);

## Development setup

1. Use a [Development Containers](https://containers.dev)-compatible editor to
   open the project. The editor will automatically set up a development
   environment with all the necessary dependencies and tools;
2. Connect to the development container;

## Developing

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

### TypeScript

[TypeScript](https://www.typescriptlang.org) is used for development.

#### Checking

Run

```
npm run typescript:check
```

to perform type checking.
