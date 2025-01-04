<!-- markdownlint-disable -->
# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.6...v2.2.0) (2024-12-24)

### ⚠ BREAKING CHANGES

* **build-deps:** migrate eslint to latest versions
* **dependencies:** mass-solve dependency issues in package's tree

### Features

* add new labels, backlog and etc. ([dadc35c](https://github.com/mokkapps/changelog-generator-demo/commits/dadc35c34e17e4f13ab4ffc34ec29ba812a5918e))
* **build-deps:** migrate eslint to latest versions ([cf39931](https://github.com/mokkapps/changelog-generator-demo/commits/cf3993158d37d0967de2b0c5f79823707c9236f5))
* implement PYTHON linters in root directory and their config-paths ([38c8c08](https://github.com/mokkapps/changelog-generator-demo/commits/38c8c087256c78cebc09cad428b451263cbaf3ef))
* integrate LFS into the package ecosystem ([cf6475d](https://github.com/mokkapps/changelog-generator-demo/commits/cf6475d4ba0a9b95422b5af9861a136a6518bbae))
* **lint:** add JSONC linter ([03dea79](https://github.com/mokkapps/changelog-generator-demo/commits/03dea79ad1f9dc50a0d4bb1db00ab1c719592ef8))
* **lint:** add SHFMT to the repository, provide some GITATTRIBUTES and etc. ([e0c6afc](https://github.com/mokkapps/changelog-generator-demo/commits/e0c6afc189d9a69892add0195d333def4d8760b0))
* **linters:** integrate markdownlint with prettier ([d6a27aa](https://github.com/mokkapps/changelog-generator-demo/commits/d6a27aa86c5d33817e208283b7da91327f598fcb))
* **linting:** add feature to make .SH executable by hooks ([27a7bd8](https://github.com/mokkapps/changelog-generator-demo/commits/27a7bd86856c0a15cf0446e3449e53ae552c5d0d))
* **versioning:** add issues versioning sync in sync script ([565e649](https://github.com/mokkapps/changelog-generator-demo/commits/565e64941fa836c8fded07d4aacbf8d3ce2f7f79)), closes [#181](https://github.com/Falcion/Patternugit/issues/181)
* **versioning:** add scripts and ecosystem to automate versioning and etc. ([f331273](https://github.com/mokkapps/changelog-generator-demo/commits/f33127304c472ee91cb1a188c8d255e1005b3436)), closes [#182](https://github.com/Falcion/Patternugit/issues/182)

### Fixes

* **aftermerge:** fix aftermerge issues with dependabot ([a5dde1d](https://github.com/mokkapps/changelog-generator-demo/commits/a5dde1d3a23b1786293847334158e0a0d4d4ed30))
* **build-hooks:** fix JS associated hooks in linting hook ([caf6e3c](https://github.com/mokkapps/changelog-generator-demo/commits/caf6e3c653c542e69ddca44b1406a87095b3d291))
* **build-hooks:** make chmod hook crossplatform ([9272000](https://github.com/mokkapps/changelog-generator-demo/commits/927200002a2fd5d0cbd1b686a1185b588424c5d9))
* **build:** fix esbuild and stage errors with missing modules ([5e8d378](https://github.com/mokkapps/changelog-generator-demo/commits/5e8d3789b00ec14ede923b809aa97aa67399a720))
* **dependencies:** mass-solve dependency issues in package's tree ([12eed83](https://github.com/mokkapps/changelog-generator-demo/commits/12eed835d112c1d9796ffdbd17f5eeda1c219d88))
* **docs:** fix changelog and it's tag policies and order ([4465410](https://github.com/mokkapps/changelog-generator-demo/commits/4465410c4138637eea2e373c1a2bfca601137b78)), closes [#179](https://github.com/Falcion/Patternugit/issues/179)
* fix build and update lib and target of TS, append linter with them ([5357e42](https://github.com/mokkapps/changelog-generator-demo/commits/5357e42e513b07f59cc3d38159cf8a8a014afff7))
* fix UTF encoding and tweaks in documentation ([1a66a1c](https://github.com/mokkapps/changelog-generator-demo/commits/1a66a1c888951b5bced4ef4c25c7798e79696279))
* **husky:** add future-proof docs and fix of husky's problems ([a076372](https://github.com/mokkapps/changelog-generator-demo/commits/a07637222cc790cd9c6f53d3bfd3a5a463605302))
* **labels:** fix of [#190](https://github.com/Falcion/Patternugit/issues/190), add new labels ([8f554e3](https://github.com/mokkapps/changelog-generator-demo/commits/8f554e3462c5a26fa6ed7ff6ac0cb312d42ba025))
* **lint:** attempt to fix BASH according to linter ([f1140b1](https://github.com/mokkapps/changelog-generator-demo/commits/f1140b16a6cb57edbb8ae0d108c0edd5a2ac76fb))
* **lint:** attempt to fix BASH according to linter ([4016816](https://github.com/mokkapps/changelog-generator-demo/commits/40168161197d46fd8f5b0c0afa0734e840fb25e5))
* **lint:** attempt to fix CHECKOV according to linter ([e9b3c1e](https://github.com/mokkapps/changelog-generator-demo/commits/e9b3c1ec1b2763f5934a31ac50d9bf3054b14eb6))
* **lint:** attempt to fix CHECKOV according to linter ([e832f51](https://github.com/mokkapps/changelog-generator-demo/commits/e832f517c2022f70a556abac1c9e1fcab0842d4a))
* **lint:** attempt to fix CHECKOV according to linter ([c2d11dd](https://github.com/mokkapps/changelog-generator-demo/commits/c2d11ddd1b0f1b927bb853f15b3e65a09f58b5db))
* **lint:** attempt to fix EDITORCONFIG and MARKDOWNLINT for linter ([303ece0](https://github.com/mokkapps/changelog-generator-demo/commits/303ece00c506f18287c10298f17878fa2e6bd19f))
* **lint:** attempt to fix EDITORCONFIG and MARKDOWNLINT for linter ([04d763c](https://github.com/mokkapps/changelog-generator-demo/commits/04d763c8694f7155d8dee4a57dbfffb5e169f1ec))
* **lint:** attempt to fix NATURAL_LANGUAGE for linter ([91c087f](https://github.com/mokkapps/changelog-generator-demo/commits/91c087f03f36c468a920f8e900b6a393de1ce93c))
* **lint:** attempt to fix TYPESCRIPT and JAVASCRIPT for linter ([b13cabd](https://github.com/mokkapps/changelog-generator-demo/commits/b13cabd09c2293331fa9a6d7aa2fef489f198135))
* **lint:** implement fixes by linter for PYTHON and etc. ([9db108f](https://github.com/mokkapps/changelog-generator-demo/commits/9db108f265224277ea4f455e7a3ca5de18e64473))

### Build system

* **build-ci:** implement PYLINT into the environment ([71ac537](https://github.com/mokkapps/changelog-generator-demo/commits/71ac5376f8921fdfe73022e303b86924d0794339))
* **build-feats:** add linter again to the repository ([b6abce2](https://github.com/mokkapps/changelog-generator-demo/commits/b6abce23105a482f53904581bd5eee02a8114da8)), closes [#189](https://github.com/Falcion/Patternugit/issues/189)
* **ci-deps:** advance actions stale in terms of labels and time ([4d9d66b](https://github.com/mokkapps/changelog-generator-demo/commits/4d9d66b8bec4c989f356cca7f697e006b3c6f9ac))
* **deps-dev:** bump @electron/lint-roller from 2.4.0 to 3.0.0 ([c438d8f](https://github.com/mokkapps/changelog-generator-demo/commits/c438d8f258da1b154eb17368331ca05bf8fe210d))
* **deps-dev:** bump markdownlint from 0.35.0 to 0.36.1 ([d48185b](https://github.com/mokkapps/changelog-generator-demo/commits/d48185b77552cfad3c6d1032f7347d95efdb4528))
* **deps-dev:** bump markdownlint from 0.36.1 to 0.37.0 ([0bb6f34](https://github.com/mokkapps/changelog-generator-demo/commits/0bb6f34d57cf5f9915fa02c40779bad27d1bdb45))
* **deps:** bump github-wiki-sidebar from 1.1.2 to 2.0.1 ([c046d0d](https://github.com/mokkapps/changelog-generator-demo/commits/c046d0d9cd0d0ec4284c4358a454eb901e6c7ee4))
* **deps:** bump markdownlint-cli2 from 0.14.0 to 0.15.0 ([5c28253](https://github.com/mokkapps/changelog-generator-demo/commits/5c28253ab26d0939bd266d7ab367ad41abec3cc6))
* **deps:** bump markdownlint-cli2 from 0.15.0 to 0.16.0 ([c9ab70d](https://github.com/mokkapps/changelog-generator-demo/commits/c9ab70d5ed5a0c65f2e3015616373ea8c4a09b3c))
* **deps:** bump pozil/auto-assign-issue from 1.11.0 to 2.0.1 ([3f66875](https://github.com/mokkapps/changelog-generator-demo/commits/3f66875e007c608fac5f93decca031e4124e38bb))
* **husky:** move related scripts for husky as MJS ([6a99def](https://github.com/mokkapps/changelog-generator-demo/commits/6a99def6becf427c370e6a417583fe1b2e045f42))

### [2.1.5](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.4...v2.1.5) (2024-10-04)

### Features

* **changesets:** integrate changesets into repository's infrastructure ([5f6ca5a](https://github.com/mokkapps/changelog-generator-demo/commits/5f6ca5a1d6d090ec246f219a0e06d2b8bea3c09c))

### Fixes

* **optimization:** add optimization to the build-check within package-lock and CI command ([d299084](https://github.com/mokkapps/changelog-generator-demo/commits/d299084850353d30e27edc0999d8a6de54916aa7))

### [2.1.4](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.3...v2.1.4) (2024-10-04)

### Build system

* **build-deps:** add github-wiki-sidebar package for wiki's development ([f49e29d](https://github.com/mokkapps/changelog-generator-demo/commits/f49e29da276552927a752414a3fa5cf34a22b9d3))
* **deps-dev:** bump @npmcli/package-json from 5.2.1 to 6.0.0 ([a217700](https://github.com/mokkapps/changelog-generator-demo/commits/a217700631a4def6d58cdbf5893fbe78ea47316b))
* **deps:** bump actions/checkout from 3 to 4 ([c0fb0fe](https://github.com/mokkapps/changelog-generator-demo/commits/c0fb0fed03a4a4b6710ce79ba9e030f876a6b373))
* **deps:** bump actions/setup-node from 3 to 4 ([cc61eab](https://github.com/mokkapps/changelog-generator-demo/commits/cc61eab7cd1333cb7aa5bfbcd29a0f53736417fd))
* **deps:** bump actions/setup-python from 4 to 5 ([eab0aa4](https://github.com/mokkapps/changelog-generator-demo/commits/eab0aa49d8821c8048e76ddfd74571f6bbd441a6))

### Fixes

* **script:** fix ESLINT (self-assign) in preparation script ([432a225](https://github.com/mokkapps/changelog-generator-demo/commits/432a2258ddfd2f865337960471d78f08297e5931))
* **yaml:** fix yaml language server problem in templates ([e39be90](https://github.com/mokkapps/changelog-generator-demo/commits/e39be9006ec0db9f31f5b0b9db76eccb629ad049))

### [2.1.3](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.2...v2.1.3) (2024-09-27)

### Features

* **prepare:** rewrite prepare script to semiold style of work process ([746dd4d](https://github.com/mokkapps/changelog-generator-demo/commits/746dd4df7e642af50339cdc3f4ac703f47292d05))
* **script:** add JS version of main preparation script ([f978853](https://github.com/mokkapps/changelog-generator-demo/commits/f978853d8b396b8488b1a99faa92019ae345aa04))

### Refactoring

* **package:** change prepare script to support .SH environments ([9949c03](https://github.com/mokkapps/changelog-generator-demo/commits/9949c0395a418a80bc3faf15d4999ebfe92c6754))

### Documentation

* **jsdocs:** add documentatin in the code ([370efa8](https://github.com/mokkapps/changelog-generator-demo/commits/370efa84463672f20f5734353efda3dac3999839))

### Fixes

* **build-env:** fix build environment to new file typings and names ([76421b4](https://github.com/mokkapps/changelog-generator-demo/commits/76421b4209667abccf855a3270f364049453c854))
* **build-tests:** add early Python setup for prepare scripts ([21afefa](https://github.com/mokkapps/changelog-generator-demo/commits/21afefa8f7d75a03e0b854f408090a3d785c0f4a))
* **imports:** fix imports in main script ([7efa56b](https://github.com/mokkapps/changelog-generator-demo/commits/7efa56b5603180e82b24cca47871afbe3dfa96cf))
* **imports:** semantic fix imports in main script and package ([f23885b](https://github.com/mokkapps/changelog-generator-demo/commits/f23885b1efcd9849b98290ac27374373c4555b8b))
* **node:** try to fix setup@node in the workflow ([382cdb3](https://github.com/mokkapps/changelog-generator-demo/commits/382cdb34dc3f534d1ac8d8b2fc217ebf55596c6f))

### [2.1.2](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.1...v2.1.2) (2024-09-27)

### Build system

* **dependency-tests:** add dependency tests and build for Node.js env of project ([6cf3319](https://github.com/mokkapps/changelog-generator-demo/commits/6cf3319ce28b936cd786e20a2e3a90537be599ff))
* **deps:** bump esbuild from 0.23.1 to 0.24.0 ([581160a](https://github.com/mokkapps/changelog-generator-demo/commits/581160aac35eea8b3aaf49bf8528f67ce88a9505))

### [2.1.1](https://github.com/mokkapps/changelog-generator-demo/compare/v2.1.0...v2.1.1) (2024-09-24)

### Build system

* **deps-dev:** bump @typescript-eslint/eslint-plugin ([2e4c907](https://github.com/mokkapps/changelog-generator-demo/commits/2e4c907bf0fc9656e221a8e953e035cdd4afddca))
* **deps-dev:** bump @typescript-eslint/parser from 7.18.0 to 8.7.0 ([4d1fa62](https://github.com/mokkapps/changelog-generator-demo/commits/4d1fa6240b4f6325a6d36d70d59a0bab917ec317))
* **linting:** appended some linting and fix linters behaviour ([f1a5294](https://github.com/mokkapps/changelog-generator-demo/commits/f1a5294e2ab44099d0ca27ab61c5a682ed48876b))

### Fixes

* **common:** fix calling errors in main script and add definitions ([ecd139a](https://github.com/mokkapps/changelog-generator-demo/commits/ecd139af12452236bc1eb5a908dfe8179dfd090c))
* **definitions:** fix definitions check of linters causing errors ([ef56ef0](https://github.com/mokkapps/changelog-generator-demo/commits/ef56ef07726ad9a097be0d29cd546cedde37f14b))
* **package:** append node and npm requirements and append to latest linters ([b70d3f3](https://github.com/mokkapps/changelog-generator-demo/commits/b70d3f3434522aea8bbec87fe3b6fb5cdcfbd04c))
* **workflows:** fix auto-assign workflow of [#170](https://github.com/Falcion/Patternugit/issues/170) ([2207136](https://github.com/mokkapps/changelog-generator-demo/commits/220713610720d98c64271ff9e78a1d02d11211ef))

### Refactoring

* **docs:** refactored docs accordingly to linters ([4cf5036](https://github.com/mokkapps/changelog-generator-demo/commits/4cf5036dec818b2d0fa9437531297b149fe1863f))

## [2.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v2.0.0...v2.1.0) (2024-09-24)

### Build system

* **scripts:** fork scripts folder and implement them in the infrastructure ([101dec9](https://github.com/mokkapps/changelog-generator-demo/commits/101dec94b4d12cf060b4644ba6d84fb4f7c95c06)), closes [#162](https://github.com/Falcion/Patternugit/issues/162) [#163](https://github.com/Falcion/Patternugit/issues/163)

### Fixes

* **docs:** fix unsupported versions file, fix of [#164](https://github.com/Falcion/Patternugit/issues/164) ([270b08e](https://github.com/mokkapps/changelog-generator-demo/commits/270b08e1c85557647a608566a6fe9cada712ce67))
* **workflows:** fix of [#168](https://github.com/Falcion/Patternugit/issues/168) ([0f42b3d](https://github.com/mokkapps/changelog-generator-demo/commits/0f42b3de8205e5b0f47b834847a7c96d829fe864))

## [2.0.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.1...v2.0.0) (2024-09-17)

### Features

* **build-deps:** add lint-staged, editorconfig and revamped package to new environment ([e0b1386](https://github.com/mokkapps/changelog-generator-demo/commits/e0b13866555622a29d368ad6642c3eed496e9e96))
* **common:** add .BAT and .SH scripts instead of old .TS file ([23b043e](https://github.com/mokkapps/changelog-generator-demo/commits/23b043e22cdeebd232472323d62ed4e9615405b8))
* **discussions:** add templates for discussions ([884ac1c](https://github.com/mokkapps/changelog-generator-demo/commits/884ac1cb6617a2b9dadb9593f8fe46837080d7f8))
* **issue-template:** add new issue template about bug report (fix of [#79](https://github.com/Falcion/Patternugit/issues/79)) ([1fb882b](https://github.com/mokkapps/changelog-generator-demo/commits/1fb882bfe391b59496c59359c78eab02b08bcca2))
* **issue-template:** add new issue template about documentation issue (fix of [#79](https://github.com/Falcion/Patternugit/issues/79)) ([4142d3a](https://github.com/mokkapps/changelog-generator-demo/commits/4142d3adb18b233e733812c15c86cf40dc1367d8))
* **issue-template:** add new issue template about documentation issue (fix of [#79](https://github.com/Falcion/Patternugit/issues/79)) ([ed76382](https://github.com/mokkapps/changelog-generator-demo/commits/ed76382baf678a7e4e8effb9e843afeca7e1a66b))
* **issue-template:** add new issue template about feature request (fix of [#79](https://github.com/Falcion/Patternugit/issues/79)) ([db4a755](https://github.com/mokkapps/changelog-generator-demo/commits/db4a7554d12f671bfab8647be1e79dee33ee4d19))
* **logo:** add imnew logo to the project instead of import-generic one ([639b624](https://github.com/mokkapps/changelog-generator-demo/commits/639b62431304a336833ef94eefd39a9efef05738))
* **mailing:** add credentials to the CODEOWNERS files (of [#81](https://github.com/Falcion/Patternugit/issues/81)) ([525dd5b](https://github.com/mokkapps/changelog-generator-demo/commits/525dd5b11d61856e121f2fb965593d72a76ee2a1))
* **main:** refactor and fork entire previous script into JS submodule ([d14632b](https://github.com/mokkapps/changelog-generator-demo/commits/d14632bb03e3effecd7bab99391b171bea1d1128))
* **roadmap:** update roadmap with current version of the repository ([ba0502e](https://github.com/mokkapps/changelog-generator-demo/commits/ba0502eaf51f1e5217dd09b9da027ecd7b10df88))
* **settings:** full rework of settings of repository within app ([391145b](https://github.com/mokkapps/changelog-generator-demo/commits/391145b29f902ff0ecd2d56eb81013a8984e4524))

### Documentation

* **community:** add "Governance model" to the repository ([b5c06ea](https://github.com/mokkapps/changelog-generator-demo/commits/b5c06eacef130246dd490f283f4ffbeac0b56d8c))
* **community:** add Pull requests policy ([9c3fe1f](https://github.com/mokkapps/changelog-generator-demo/commits/9c3fe1ffc27a2ac5f36bcee5fece6412351f59c6))
* **community:** add templates for discussions and edited main config ([680d804](https://github.com/mokkapps/changelog-generator-demo/commits/680d8046a4ce759e30c9d423344f0f4060580552))
* **community:** add templates for issues and edited main config ([da73fb0](https://github.com/mokkapps/changelog-generator-demo/commits/da73fb0852d4a5fa939d1051487905c3d1f2bf9b))
* **community:** fork "BEST_PRACTICES_FOR_MAINTAINERS" document ([17cdbb2](https://github.com/mokkapps/changelog-generator-demo/commits/17cdbb2024c078493030401c64c72856a2e9b903))
* **community:** fork "BUILDING_WELCOMING_COMMUNITY" document ([8092898](https://github.com/mokkapps/changelog-generator-demo/commits/8092898086fa43529df9bd24cea204f45f226060))
* **community:** fork "HOW_TO_CONTRIBUTE_TO_OPEN_SOURCE" document ([9a6f308](https://github.com/mokkapps/changelog-generator-demo/commits/9a6f3082aa6bc4fa9c1ab3d995c8145c2c29658c))
* **community:** fork "LEADERSHIP_AND_GOVERNANCE" document ([aea57b6](https://github.com/mokkapps/changelog-generator-demo/commits/aea57b699f9bf239e40a836aa8ce5ab2a62cd615))
* **community:** fork "STARTING_AN_OPEN_SOURCE_PROJECT" document ([4c099be](https://github.com/mokkapps/changelog-generator-demo/commits/4c099be254c1da1261f8167e08021257e3766b53))
* **community:** fork Pull request template and fix of [#89](https://github.com/Falcion/Patternugit/issues/89) ([7f733ce](https://github.com/mokkapps/changelog-generator-demo/commits/7f733ce59cf86363a990fa3ec4bf6ea2e85a1a72))
* **community:** fork Security policy ([680277a](https://github.com/mokkapps/changelog-generator-demo/commits/680277a6ee934cd111a374a2a82cdfe98eeeebe4))
* **git:** add semver docs ([25c3ca9](https://github.com/mokkapps/changelog-generator-demo/commits/25c3ca9404e4bba2ca2e21c0f1f0a4f3ebd2f396))
* **github:** add Commit convention policy (Conventional commits) ([ac15b47](https://github.com/mokkapps/changelog-generator-demo/commits/ac15b476eea70ae2abde2851b22b35b2d5a61795))
* **github:** add Issue triage policy ([01bbee0](https://github.com/mokkapps/changelog-generator-demo/commits/01bbee09e40a7a6c7d0ed5d740a547249bb03648))
* **github:** add new version of Code of Conduct ([00bb1d9](https://github.com/mokkapps/changelog-generator-demo/commits/00bb1d92716a31ff457a3d42aa20393f9bdbaf0c))
* **github:** add new version of Contribution Policy ([bc31325](https://github.com/mokkapps/changelog-generator-demo/commits/bc3132544260bc3682af160a6355f657db6c3d64))
* **github:** add new version of Security Policy ([81be10a](https://github.com/mokkapps/changelog-generator-demo/commits/81be10aaffacc2b556a2ec690eae11aec50a4188))
* **github:** create generic issue template ([887d545](https://github.com/mokkapps/changelog-generator-demo/commits/887d5455b5c8b8e2f50f4e97b6aa92c6eba5b3ed))
* **github:** create Issue Policy ([65cde21](https://github.com/mokkapps/changelog-generator-demo/commits/65cde21335260e62e2f6d70723729cca87d818ff))
* **github:** create Pull request template ([ca31ecd](https://github.com/mokkapps/changelog-generator-demo/commits/ca31ecdac532c9dc2301b5382887443a9c1bd242))
* **github:** create Pull requests Policy ([7f47bb3](https://github.com/mokkapps/changelog-generator-demo/commits/7f47bb38614d6f8566fa7482f873ee4329e35bf9))
* **github:** fork 'Issue policy" from unmerged tag ([f15d8ef](https://github.com/mokkapps/changelog-generator-demo/commits/f15d8efc269ba38f7cf73ac13bbc6091697a929b))
* **github:** fork "Contribution guidelines" from unmerged tag ([356b2c9](https://github.com/mokkapps/changelog-generator-demo/commits/356b2c9f00a4c05f30ffb1e61060d56114898359))
* **github:** fork and refactor CODE_OF_CONDUCT to new workflows ([cd14cfa](https://github.com/mokkapps/changelog-generator-demo/commits/cd14cfa7a7679d1aa487b110e5e7fbe272e26d4e))
* **husky-docs:** split HUSKY's documentation in submodules ([dc8bc61](https://github.com/mokkapps/changelog-generator-demo/commits/dc8bc616306b99386dafa2673295e963f1c8e2a9))
* **issues:** add universal default form for issues of other category ([73964c2](https://github.com/mokkapps/changelog-generator-demo/commits/73964c272d7fefb71d83b4b6766916c6e3951744))
* **kubernetes:** add information file about binary execs of Kubernetes ([837ab41](https://github.com/mokkapps/changelog-generator-demo/commits/837ab41121677cd04b1d46da04a15645cb438db2))
* **labels-data:** add special README about working with repository's data ([e064c95](https://github.com/mokkapps/changelog-generator-demo/commits/e064c95b621bae4b3ccc46794a5d73a2c9887fde))

### Build system

* **build-deps:** fork and implement new version of Husky hooks ([b5c9c28](https://github.com/mokkapps/changelog-generator-demo/commits/b5c9c2804bb500a7ec3cca07623089a0724bd2cc))
* **build-env:** add list of required apps for workflows and repository ([90f0b88](https://github.com/mokkapps/changelog-generator-demo/commits/90f0b884d39ddbee857eaa4ab96cef5c0a873f14))
* **deps-dev:** bump @electron/lint-roller from 1.13.0 to 2.2.0 ([c540350](https://github.com/mokkapps/changelog-generator-demo/commits/c54035067fdbdb22cd713d25b90b5d04f644556c))
* **deps-dev:** bump @npmcli/package-json from 5.1.0 to 5.2.0 ([fa20ee0](https://github.com/mokkapps/changelog-generator-demo/commits/fa20ee093f4740aec7644527390eb96755b6d41e))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([4731168](https://github.com/mokkapps/changelog-generator-demo/commits/47311685a87ae49adf521413fcb519ffc2453c01))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([2b062dc](https://github.com/mokkapps/changelog-generator-demo/commits/2b062dc015c0abeb630178be4318eeeef5563539))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([2a83674](https://github.com/mokkapps/changelog-generator-demo/commits/2a8367424ac36b382169b287714ef8c412aabde5))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([0e90cb8](https://github.com/mokkapps/changelog-generator-demo/commits/0e90cb886d182c35969326d074ae8a484f5f5d5a))
* **deps-dev:** bump @typescript-eslint/eslint-plugin ([7996b84](https://github.com/mokkapps/changelog-generator-demo/commits/7996b8422dc5b6196230f78a772ac90875abcc40))
* **deps-dev:** bump @typescript-eslint/parser from 7.13.0 to 7.14.1 ([5dac19e](https://github.com/mokkapps/changelog-generator-demo/commits/5dac19e1b59f6ad1699a758cc0a458d0745d5d71))
* **deps-dev:** bump @typescript-eslint/parser from 7.14.1 to 7.15.0 ([f94f2a6](https://github.com/mokkapps/changelog-generator-demo/commits/f94f2a61b076018911c36bc860159d1ccf01b010))
* **deps-dev:** bump @typescript-eslint/parser from 7.15.0 to 7.16.0 ([4baf402](https://github.com/mokkapps/changelog-generator-demo/commits/4baf402921044a63f8f3a640ea1dc83e703717d2))
* **deps-dev:** bump @typescript-eslint/parser from 7.8.0 to 7.9.0 ([a26a495](https://github.com/mokkapps/changelog-generator-demo/commits/a26a495a916f333f21472099d9dfec7ad669c24b))
* **deps-dev:** bump @typescript-eslint/parser from 7.9.0 to 7.13.0 ([9ae9e13](https://github.com/mokkapps/changelog-generator-demo/commits/9ae9e132f5aaa76edeefbe0d5997ee71955b7472))
* **deps-dev:** bump eslint from 9.2.0 to 9.5.0 ([9c7a5cd](https://github.com/mokkapps/changelog-generator-demo/commits/9c7a5cdfdfedf860c3b2b62a02ca00d9f49b9506))
* **deps-dev:** bump eslint from 9.5.0 to 9.6.0 ([0cc72d6](https://github.com/mokkapps/changelog-generator-demo/commits/0cc72d6a5cfeaa9638d596686baefbbe88af1c2d))
* **deps-dev:** bump eslint from 9.6.0 to 9.7.0 ([3f218dd](https://github.com/mokkapps/changelog-generator-demo/commits/3f218ddbe2ea018a0b5d9140e34c483c7345e782))
* **deps:** bump braces from 3.0.2 to 3.0.3 in the npm_and_yarn group ([596cec9](https://github.com/mokkapps/changelog-generator-demo/commits/596cec9cea32c808d5bcf466d05d80d04c2e9ab7))
* **deps:** bump esbuild from 0.21.2 to 0.21.3 ([7e1b6ab](https://github.com/mokkapps/changelog-generator-demo/commits/7e1b6abea81941691cc6e42d1e3c4a1769d5b21c))
* **deps:** bump esbuild from 0.21.3 to 0.21.5 ([fded9b6](https://github.com/mokkapps/changelog-generator-demo/commits/fded9b67d708195d30685f6980a0881c0d01fc03))
* **deps:** bump esbuild from 0.21.5 to 0.23.0 ([2176ca8](https://github.com/mokkapps/changelog-generator-demo/commits/2176ca825a56ed7584d065542b3626d397498ba6))
* **deps:** bump esbuild-sass-plugin from 3.2.0 to 3.3.1 ([2c1ee2b](https://github.com/mokkapps/changelog-generator-demo/commits/2c1ee2b546292c8eef973de500d87ff351a8acd8))
* **deps:** bump husky from 9.0.11 to 9.1.1 ([30dcfa3](https://github.com/mokkapps/changelog-generator-demo/commits/30dcfa3b7ad39046bb9f64b606f0187bb3a834e6))
* **deps:** bump lint-staged from 15.2.2 to 15.2.7 ([78cd408](https://github.com/mokkapps/changelog-generator-demo/commits/78cd4089117209644abd9d5067a118b869b28499))
* **deps:** bump prettier from 3.2.5 to 3.3.2 ([3fb0f91](https://github.com/mokkapps/changelog-generator-demo/commits/3fb0f91fed629d8654834e34bbaea010ef9da7fa))
* **deps:** bump prettier from 3.3.2 to 3.3.3 ([791f4cf](https://github.com/mokkapps/changelog-generator-demo/commits/791f4cf7069ea03e5976eae34d08c3fc7976abe3))
* **deps:** bump the npm_and_yarn group with 3 updates ([5f53794](https://github.com/mokkapps/changelog-generator-demo/commits/5f53794fff1343027f9b45602937b4b0d6d22d43))
* **deps:** bump typescript from 5.4.5 to 5.5.2 ([fce5890](https://github.com/mokkapps/changelog-generator-demo/commits/fce5890fe0be96d33f6dbc23d96a3626b1b9456d))
* **deps:** bump typescript from 5.5.2 to 5.5.3 ([69c0bb5](https://github.com/mokkapps/changelog-generator-demo/commits/69c0bb57c8622f72468eda87bcc30dc5d9f6f672))
* **editor:** add VS Code presets ([9e3ffbb](https://github.com/mokkapps/changelog-generator-demo/commits/9e3ffbbeaaed3338866e87284ddabb5be6a80c5f))
* **editorconfig:** set up `.editorconfig` to markdownlint ([d4d60c2](https://github.com/mokkapps/changelog-generator-demo/commits/d4d60c2f412f3e2bd4fefbba62b55737b2a22a69))
* **git:** add `.gitconfig` with refactored and advanced configurations ([a3d62bf](https://github.com/mokkapps/changelog-generator-demo/commits/a3d62bf852eedc7fb42d7e8be3b57a9cf1cc5a51))
* **gitconfig:** implement new more advanced gitconfig ([9168380](https://github.com/mokkapps/changelog-generator-demo/commits/9168380171f591168c7c41c8d45ccee5366681a8))
* **husky-cfg:** add new implementations and hooks for Husky and lint-staged ([29afc9a](https://github.com/mokkapps/changelog-generator-demo/commits/29afc9afcf8926b27871a1948dc5539931158fb3))
* **husky:** append HUSKY hooks and remove exiting at everything ([0cd3a11](https://github.com/mokkapps/changelog-generator-demo/commits/0cd3a11b3fb83d86ec05a2c68dcdce5342090c3f))
* **keys:** add PGP keys and correlated instructions about them ([9552ffd](https://github.com/mokkapps/changelog-generator-demo/commits/9552ffd6916c4d7b7c3eaced131416b12c67e9e1))
* **kubernetes:** add Bat installation script for Kubernetes ([33fec26](https://github.com/mokkapps/changelog-generator-demo/commits/33fec263f654792f7c00f9525896be2e794aefb0))
* **kubernetes:** add deinstallation scripts for Kubernetes ([90f4096](https://github.com/mokkapps/changelog-generator-demo/commits/90f4096562a05212aad3d3cb4d178ba53bb7989d))
* **kubernetes:** add Shell installation script for Kubernetes ([494e053](https://github.com/mokkapps/changelog-generator-demo/commits/494e053d73e77f08248d7344db0fab2cd53da856))
* **launch:** add launch config to local VS-CODE setup ([f740231](https://github.com/mokkapps/changelog-generator-demo/commits/f74023187325f8e294d9098d83ca44806b79a6e3))
* **obsidian:** add OBSIDIAN to the environment ([c0227b7](https://github.com/mokkapps/changelog-generator-demo/commits/c0227b775dfec0613126ce4345949de6f7ebc93c))
* **visualize:** add common analytics and visualizers for the repository ([0cc1313](https://github.com/mokkapps/changelog-generator-demo/commits/0cc1313b1f700e932d38989553f3cac30d4894ad))
* **workflows-apps:** add workflows and apps to the repository ([c45f75b](https://github.com/mokkapps/changelog-generator-demo/commits/c45f75bf86f08e459afe1e86f0f4abc70755676b))
* **workflows-deps:** add GitHub Actions addons to workflows state ([5b4cea1](https://github.com/mokkapps/changelog-generator-demo/commits/5b4cea195f9122b3cee7eaa478b9ad60e869cb18))
* **workflows-deps:** add labeler integration with it's plugin ([c88d9b4](https://github.com/mokkapps/changelog-generator-demo/commits/c88d9b4df9be24d26bb5d561f5d36457ff3929d0))
* **workflows-deps:** implement Docker Action as an addon ([1076297](https://github.com/mokkapps/changelog-generator-demo/commits/10762976f202a90773a38ee736d691c9a1ff9b8d))
* **workflows:** add Auto-approve and Auto-assign workflows ([64b6edf](https://github.com/mokkapps/changelog-generator-demo/commits/64b6edf4590ea3aa8a2082d1b33470c8647e24ef))
* **workflows:** add workflow for tag checking (fork from unmerged tags) ([f0cf7d1](https://github.com/mokkapps/changelog-generator-demo/commits/f0cf7d1b30143d9b3b6c56151df9ce6f9cc80a35))
* **workflows:** add workflow to CI Workflow (Skip duplicates) ([865121b](https://github.com/mokkapps/changelog-generator-demo/commits/865121b794f21ca003109775ceacbaac665d7e42))
* **workflows:** intergrate "Lint PR" ([474b1f6](https://github.com/mokkapps/changelog-generator-demo/commits/474b1f6302ff1c27529fa62584dd04ec1bdfe4bc))
* **workflows:** intergrate lint-staged in the repo ([5176b18](https://github.com/mokkapps/changelog-generator-demo/commits/5176b182aee29257fee688afc9ca9d3110495074))
* **workflows:** intergrate Trufflehog OSS ([dea574a](https://github.com/mokkapps/changelog-generator-demo/commits/dea574a4772a233af86beaeee1e0a39a6a3cb354))
* **yaml-schemas:** add NONE schema to YAML support in the VS-CODE ([9c957f2](https://github.com/mokkapps/changelog-generator-demo/commits/9c957f27c8cd3ef6aa5e4a6b9022e5e1dc1b283b))

### Fixes

* **linters:** add new linter instead old one which was not working ([b8b90b4](https://github.com/mokkapps/changelog-generator-demo/commits/b8b90b4d8e4031c82ae397fca373c90dd47820b0))
* **typescript-modules:** fix ESM modulation and tsconfig specs errors ([df06c37](https://github.com/mokkapps/changelog-generator-demo/commits/df06c3714edc0a4c6d86eeedc7b90f396049cc93))

### Refactoring

* **CODE_OF_CONDUCT.md:** refactor Code of Conduct according to Markdownlint ([6d71e94](https://github.com/mokkapps/changelog-generator-demo/commits/6d71e94dcb86c7370ffddff7a54fb51a7b3740cf))
* **docs:** refactor and fix of docs according to linter (partial) ([7097f5c](https://github.com/mokkapps/changelog-generator-demo/commits/7097f5cf00ed9acab92bde1401bb24ecc0efe04b))
* **docs:** refactor and fix of docs according to linter (partial) ([4288f81](https://github.com/mokkapps/changelog-generator-demo/commits/4288f813a36c45b8be9ae3b3d27e6aa60c9a1875))
* **docs:** refactor and fix of docs according to linter (partial) ([47140e5](https://github.com/mokkapps/changelog-generator-demo/commits/47140e5fbcbe204dd2ce292abd9eb6cb4d184aa3))
* **docs:** refactor and fix of docs according to linter (partial) ([2c2b9f4](https://github.com/mokkapps/changelog-generator-demo/commits/2c2b9f41543bec7fe15f5a0209b603247bb92705))
* **husky-docs:** refactor README for HUSKY's troubleshooting guides ([ecdf0fc](https://github.com/mokkapps/changelog-generator-demo/commits/ecdf0fc934c56d3cace617d5cb59a0a7d09f8cfe))
* **project:** refactored and revamped entire project ([ecd2310](https://github.com/mokkapps/changelog-generator-demo/commits/ecd2310ce9ad6cf4f0d9397d18c1dc5c2465757d))
* **repository:** clear old state of repository and infrastructure for it ([5cf11cc](https://github.com/mokkapps/changelog-generator-demo/commits/5cf11cc7590dde9f6ea6baee0e2939d57a3795b2))

### [1.0.1](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.0...v1.0.1) (2024-05-14)

### Features

* **code-docs:** add js-docs to the code and typings ([a0c7d19](https://github.com/mokkapps/changelog-generator-demo/commits/a0c7d19118d0af09b75eceb09c3c0e53bc184849))
* **kubernetes:** add Kubernetes to the repo ([7689f20](https://github.com/mokkapps/changelog-generator-demo/commits/7689f20236f6ba03ae39defbaa77ef71f63d8197))
* **labeling:** add labels in issue and discussions templates ([3364c53](https://github.com/mokkapps/changelog-generator-demo/commits/3364c53521496ac05161cc27a180e24a25411bc4))
* **labeling:** add new simple labels for issues and etc., fix of [#46](https://github.com/Falcion/Patternugit/issues/46) ([01b14b0](https://github.com/mokkapps/changelog-generator-demo/commits/01b14b018dea3f0e2dc7d58f9070bb6d1f683d67))
* **scripting:** add new version of environment setup script to the project ([bce5011](https://github.com/mokkapps/changelog-generator-demo/commits/bce50114eb0ed060afc3a0fafc9fc0132bdfa0dc))
* **template:** add discussions templates, fix of [#50](https://github.com/Falcion/Patternugit/issues/50) ([604058c](https://github.com/mokkapps/changelog-generator-demo/commits/604058ced2815e9cd149ecfbc3f37bfc42d60075))
* **typings:** add typescript typing for script ([c4b1ae1](https://github.com/mokkapps/changelog-generator-demo/commits/c4b1ae119332fbfedfc4650235e9538091337f4c))

### Fixes

* **docs:** fix of [#48](https://github.com/Falcion/Patternugit/issues/48), wrong header in PULL_REQUEST_TEMPLATE ([283fa63](https://github.com/mokkapps/changelog-generator-demo/commits/283fa634b8c845579710e9c4c88d354d5a1b94dc))
* **labeling:** fix of [#46](https://github.com/Falcion/Patternugit/issues/46) ([2aab80f](https://github.com/mokkapps/changelog-generator-demo/commits/2aab80f6d61727fabeb620d44f4d1775766d4621))

### Build system

* **build-deps:** add ESBUILD to the building configs ([6a9d909](https://github.com/mokkapps/changelog-generator-demo/commits/6a9d90920d43b39aa1eb18b6c05a6c45dc16d516))
* **build-deps:** upgrade @electron/lint-roller to "^1.13.0" ([57416c0](https://github.com/mokkapps/changelog-generator-demo/commits/57416c0b3b3a96aaee730f40088644ffad3eee96))
* **build-env:** add new scripts, modules and setups in current JSON of package ([f75750f](https://github.com/mokkapps/changelog-generator-demo/commits/f75750fece6fc11b9dd8630f5168b6124440d362))
* **build-env:** import HUSKY from previous iterations ([889e3cd](https://github.com/mokkapps/changelog-generator-demo/commits/889e3cd4daf0ce19e79a2f9f486729ac931dfb24))
* **build-env:** new infrastructure and NPM+NODE implementation in JSON config ([40dbafb](https://github.com/mokkapps/changelog-generator-demo/commits/40dbafb7b94cdf61c1169342b4ce84102c257e05))
* **deps-dev:** bump eslint from 8.57.0 to 9.2.0 ([05aabcd](https://github.com/mokkapps/changelog-generator-demo/commits/05aabcd927b815d2c30cdf7996bee51dd3e274d8))
* **deps-dev:** bump eslint-plugin-markdownlint from 0.5.0 to 0.6.0 ([ccc3e16](https://github.com/mokkapps/changelog-generator-demo/commits/ccc3e16a88c811a699b0a136797edae701b41215))
* **deps:** bump esbuild from 0.20.2 to 0.21.2 ([f76cc53](https://github.com/mokkapps/changelog-generator-demo/commits/f76cc53baea88a36778afdef96296ba0eedce307))
* **docker-env:** add DOCKERFILE and ignore for docker to the project ([aa54ba5](https://github.com/mokkapps/changelog-generator-demo/commits/aa54ba52e0c8f1e7beba9d78c461ebed26fc6ac7))

### Documentation

* **husky-issues:** add README about husky issues ([9836842](https://github.com/mokkapps/changelog-generator-demo/commits/98368426899f6adc5001e630708e9184933c8076))
* **page:** remove pages from docs ([9fa0437](https://github.com/mokkapps/changelog-generator-demo/commits/9fa0437db8ab7af17c78abad48f926cd71dfb08d))

## [1.0.0](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.5...v1.0.0) (2024-05-10)

### Refactoring

* **prepare:** append formatting in JS docs of preparation script and add little semantic tweaks ([36cb3a0](https://github.com/mokkapps/changelog-generator-demo/commits/36cb3a0a77e5d7f9a94b2151069e45ca31cb3f5b))

### Build system

* **deps-dev:** bump eslint-plugin-markdownlint from 0.5.0 to 0.6.0 ([06cc9e9](https://github.com/mokkapps/changelog-generator-demo/commits/06cc9e9dc7f62f9eabd95d6addc4e76c5322caf1))
* **deps:** add unicorn@^0.0.1 ([338d31a](https://github.com/mokkapps/changelog-generator-demo/commits/338d31ab326316df0d9341b17737e3f3f50994ca))
* **deps:** bump actions/checkout from 3 to 4 ([d4f1a7a](https://github.com/mokkapps/changelog-generator-demo/commits/d4f1a7adf9d13305c7c0cc794564ccc5aa1620c1))
* **deps:** bump actions/stale from 3 to 9 ([c949cf3](https://github.com/mokkapps/changelog-generator-demo/commits/c949cf3f8b700bb3459ef4c8784c208372ff0ffa))
* **deps:** bump github/codeql-action from 2 to 3 ([a248167](https://github.com/mokkapps/changelog-generator-demo/commits/a2481678aec9036b828c7f8084dd0b14111f1e71))
* **deps:** update @commitlint/cli from ^19.1.0 to ^19.3.0 ([59f8591](https://github.com/mokkapps/changelog-generator-demo/commits/59f85912db2474ab7c3b95cde9327380aef804fb))
* **deps:** update @commitlint/config-conventional from ^19.1.0 to ^19.2.2 ([ea462c5](https://github.com/mokkapps/changelog-generator-demo/commits/ea462c538598b214f2c311af47382e66d93f6ba1))
* **deps:** update @electron/lint-roller from ^1.12.0 to ^1.12.1 ([e868707](https://github.com/mokkapps/changelog-generator-demo/commits/e868707e923d58c9d2a4a3a68cb915bb61f0cb8d))
* **deps:** update @npmcli/package-json from ^5.0.0 to ^5.1.0 ([6c1f901](https://github.com/mokkapps/changelog-generator-demo/commits/6c1f901967aae036c3cac8eaf67701f914b4bc8c))
* **deps:** update @octokit/rest from ^20.0.2 to ^20.1.0 ([0789996](https://github.com/mokkapps/changelog-generator-demo/commits/0789996b9f7c4060d10b358a93cd5f6ae8bf35cc))
* **deps:** update @types/node from ^20.11.27 to ^20.12.7 ([0dc76b6](https://github.com/mokkapps/changelog-generator-demo/commits/0dc76b6db901ab72d8d062d0372aba93c2336d7a))
* **deps:** update @typescript-eslint/eslint-plugin from ^7.2.0 to ^7.7.1 ([5e96073](https://github.com/mokkapps/changelog-generator-demo/commits/5e960731e32ba2f31e709d9f3a6fad80e4a0d016))
* **deps:** update @typescript-eslint/parser from ^7.2.0 to ^7.7.1 ([3e170a9](https://github.com/mokkapps/changelog-generator-demo/commits/3e170a9db9b69572a6c4d630d52cdfa0ebfff38d))
* **deps:** update axios from ^1.6.7 to ^1.6.8 ([cd001ec](https://github.com/mokkapps/changelog-generator-demo/commits/cd001ec3e79be609bea9ddc484eec63d2350ea41))
* **deps:** update inquirer from ^9.2.16 to ^9.2.19 ([ecce495](https://github.com/mokkapps/changelog-generator-demo/commits/ecce4955cec7226a57ed61079def29adcb52a5cb))
* **deps:** update mocha from ^10.3.0 to ^10.4.0 ([2cc31c9](https://github.com/mokkapps/changelog-generator-demo/commits/2cc31c9767b141b6cf1507abca8fc98d14fb7621))
* **deps:** update multiple NPM dependencies ([12b3fa4](https://github.com/mokkapps/changelog-generator-demo/commits/12b3fa49dc2505f9d2a1ffca990ba49ad77251b7))
* **deps:** update typescript from ^5.4.2 to ^5.4.5 ([5a7d5d2](https://github.com/mokkapps/changelog-generator-demo/commits/5a7d5d2af3271de2a89b40ef0248659432ecfbe5))
* **env:** add CLI GITHUB to the project ([eefc00f](https://github.com/mokkapps/changelog-generator-demo/commits/eefc00ff1ddc595f9d90c38523525d14c6528cf1))
* **esbuild:** add esbuild configurating module to build project's scripts ([9260e43](https://github.com/mokkapps/changelog-generator-demo/commits/9260e43cdd826feddfdb47e9103eb95d988dc5c2))

### [0.3.5](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.4...v0.3.5) (2024-04-21)

### Features

* **full-revamp-script:** now prepare module is revampled ([bd576b4](https://github.com/mokkapps/changelog-generator-demo/commits/bd576b490304c6bc4bf45207f6790d85fc623d8d))
* **manifest-prepare:** revamped preparation script in terms of working with files ([dd951eb](https://github.com/mokkapps/changelog-generator-demo/commits/dd951eb916e428ec4062d29203ec9f6ea2c1bef6))

### Fixes

* **build:** fix script for not asking user for input ([3bece80](https://github.com/mokkapps/changelog-generator-demo/commits/3bece803a3fb90c25dc0576deec7cac800b6dcd8))

### Documentation

* **conv:** update README file for more conventional text ([19532da](https://github.com/mokkapps/changelog-generator-demo/commits/19532da8c881df29cbb5abb5118708accaf3991b))
* **index:** reimplement docs and remove them into new folder for pages data ([a215a03](https://github.com/mokkapps/changelog-generator-demo/commits/a215a03dfc7e39d02e157bf90b9caa5a1c56b97c))

### Build system

* **deps-dev:** bump markdownlint-cli2 from 0.12.1 to 0.13.0 ([e40c6da](https://github.com/mokkapps/changelog-generator-demo/commits/e40c6da74c2c0bf27253ad3047a5328b50e80086))
* **editor:** add CODE's launch configurations ([0db54c1](https://github.com/mokkapps/changelog-generator-demo/commits/0db54c1aedcb1514351ea1393c11b3c0f38c2634))

### Refactoring

* **script:** refactor code structure in PREPARE script ([f9d78f1](https://github.com/mokkapps/changelog-generator-demo/commits/f9d78f1acf969151d9bd80e23db6f1ae6cb419ae))
* **script:** refactor naming and whitespaces in PREPARE script ([27db9ce](https://github.com/mokkapps/changelog-generator-demo/commits/27db9ce8207e694b73ded550524856a86258ab22))

### [0.3.4](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.3...v0.3.4) (2024-04-01)

### Features

* **build:** update and refactor .EDITORCONFIG ([94d89b5](https://github.com/mokkapps/changelog-generator-demo/commits/94d89b5682d57cadb57e4ba944a435e84d7f63b3))
* **code:** add references and common refactoring to scripts ([cff3227](https://github.com/mokkapps/changelog-generator-demo/commits/cff3227e1b833d16abbb0b048accaba83b190154))
* **core:** add core support and prefs for OBSIDIAN ([11ad823](https://github.com/mokkapps/changelog-generator-demo/commits/11ad823ca45f64a0b31b224a6347fb7acad8990d))
* **git:** add OBSIDIAN to the ignore file ([e1a3aa4](https://github.com/mokkapps/changelog-generator-demo/commits/e1a3aa41f7b2b468d1a1c0eb147120398154a244))
* **git:** add READMEs for .GIT files ([4b19c02](https://github.com/mokkapps/changelog-generator-demo/commits/4b19c02f1ad82dd6b9cb1cfd8599793ca2d5d355))
* **git:** fix and update issue templates accordingly to YAML and GIT ([addb6c5](https://github.com/mokkapps/changelog-generator-demo/commits/addb6c5329490fa52ccb606a530601c1c9406663))

### Refactoring

* **readme:** update README file ([16ffd04](https://github.com/mokkapps/changelog-generator-demo/commits/16ffd0441fa57fba2667fd783747ce0ce69e69da))

### Fixes

* **docs:** linefix of LF and multilining (L[#70](https://github.com/Falcion/Patternugit/issues/70)) in code of conduct ([906d9d8](https://github.com/mokkapps/changelog-generator-demo/commits/906d9d815ad6cd2934b785c7550985e57b44669f))
* **security:** fix securities issues [#31](https://github.com/Falcion/Patternugit/issues/31) and [#32](https://github.com/Falcion/Patternugit/issues/32) ([111c4d0](https://github.com/mokkapps/changelog-generator-demo/commits/111c4d0d377f650f120631e0a44ad32e2ac6322f))

### Build system

* **deploy:** add resource management in DOCKER ([f05aa77](https://github.com/mokkapps/changelog-generator-demo/commits/f05aa7753b87360f40c6bf8c0d14df27c1cec4cf))
* **deploy:** add resource management in KUBERNETES ([75b22a6](https://github.com/mokkapps/changelog-generator-demo/commits/75b22a60dab28b93b5eb26a590400ea11bd5a11c))
* **deps-dev:** bump @commitlint/cli from 18.6.1 to 19.1.0 ([cb5eaf3](https://github.com/mokkapps/changelog-generator-demo/commits/cb5eaf385fd9e9fd26f9b3fb2ad6e885bbd42acb))
* **deps-dev:** bump @commitlint/config-conventional ([a15d451](https://github.com/mokkapps/changelog-generator-demo/commits/a15d45125e1054e0364a45a0e4c09065b3edd715))
* **docs:** add documentation to HUSKY issues ([9715937](https://github.com/mokkapps/changelog-generator-demo/commits/97159374ba967f0f2ecd10f58f2fe1a1a3f688d5))
* **husky:** update and refactor commit message script in deletion ([741562e](https://github.com/mokkapps/changelog-generator-demo/commits/741562e2b9797da9cd92ad2b24f791c5b2560f68))
* **package-deps:** update package manifest ([9c38d4b](https://github.com/mokkapps/changelog-generator-demo/commits/9c38d4b3c46860bf7a1f7dcf25075bf920c1df22))
* **settings:** add preferences for VS-CODE editor ([2160753](https://github.com/mokkapps/changelog-generator-demo/commits/2160753e9fa74f2b128452911448942ef92e55a8))
* **workflows:** remove auto-merge ([#34](https://github.com/Falcion/Patternugit/issues/34)) for dependabot ([a50fe5b](https://github.com/mokkapps/changelog-generator-demo/commits/a50fe5b5e764b2ba816a32962ad4ea5a65a0da91))

### Documentation

* **readme:** mass update of README ([140ebc7](https://github.com/mokkapps/changelog-generator-demo/commits/140ebc7da5f5c4cdc22bf0c00cf1b6183546a7cd))

### [0.3.3](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.2...v0.3.3) (2024-03-14)

### Common

* **scripts:** add new adapt script functionality ([29e653e](https://github.com/mokkapps/changelog-generator-demo/commits/29e653e5a89ef87d86f9121c0bafbae89510bd48))

### [0.3.2](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.1...v0.3.2) (2024-03-04)

### Fixes

* **build:** fix `ts-node` build in prepare script ([b3ea578](https://github.com/mokkapps/changelog-generator-demo/commits/b3ea578f8d27a958d4479a3e15586fb0b4f306b7))
* **build:** fix main prepare script from package's JSON ([3bdce2c](https://github.com/mokkapps/changelog-generator-demo/commits/3bdce2c3f807535f10d75f2ef56d2458b659b72d))
* **import:** fix imports of `colors` to `colors/safe` in prepare .TS script ([ce35ab4](https://github.com/mokkapps/changelog-generator-demo/commits/ce35ab42492c7dbbabbe49e9089b5110ac8ba763))

### [0.3.1](https://github.com/mokkapps/changelog-generator-demo/compare/v0.3.0...v0.3.1) (2024-03-04)

### Features

* **labels:** add priority labels to settings ([8d05e68](https://github.com/mokkapps/changelog-generator-demo/commits/8d05e68720d36783727bf8509c8a325170dadceb))

### Fixes

* **husky:** update husky preparation and fix deprecated bug ([4210ed3](https://github.com/mokkapps/changelog-generator-demo/commits/4210ed326a8ca7104f4530a677082715afeb1365)), closes [#26](https://github.com/Falcion/Patternugit/issues/26)

## [0.3.0](https://github.com/mokkapps/changelog-generator-demo/compare/v0.2.4...v0.3.0) (2024-02-28)

### Features

* **docs:** add managing guide and additional files ([b3bd307](https://github.com/mokkapps/changelog-generator-demo/commits/b3bd30733e8980f503ef8bfa2276c1f38a741b71))
* **docs:** add SemVer document ([48b94e8](https://github.com/mokkapps/changelog-generator-demo/commits/48b94e8710e8356c9d0d8904f95ffbf529f79882))

### Build system

* **deps-dev:** bump @typescript-eslint/eslint-plugin ([ba64e06](https://github.com/mokkapps/changelog-generator-demo/commits/ba64e069c9b3d288a78ad18788e1ac7775972f54))
* **deps-dev:** bump @typescript-eslint/parser from 6.21.0 to 7.0.1 ([a60ae19](https://github.com/mokkapps/changelog-generator-demo/commits/a60ae19136977ea5f9b711469d74255a8665efbe)), closes [#22](https://github.com/Falcion/Patternugit/issues/22)
* **deps-dev:** bump @typescript-eslint/parser from 6.21.0 to 7.0.1 ([3cc5c1d](https://github.com/mokkapps/changelog-generator-demo/commits/3cc5c1dcf8b9538fdd5dafdf933dbfddde8d1280))
* **deps-dev:** bump @typescript-eslint/parser from 6.21.0 to 7.0.2 ([607bb9b](https://github.com/mokkapps/changelog-generator-demo/commits/607bb9b47cd7bdbe73edba8b6462edf60087ac0b))
* **publishing:** add Shell scripts to publish (Nuget & NPM) ([b71e5cf](https://github.com/mokkapps/changelog-generator-demo/commits/b71e5cf3881df098f6960383b4fd19c6c6aed2ee))

### Refactoring

* **docs:** rewrite intro in the README ([c30d980](https://github.com/mokkapps/changelog-generator-demo/commits/c30d980263326823f2a057ad50c18dbfd7bb55d4))
* **docs:** update date in licenses ([2495d78](https://github.com/mokkapps/changelog-generator-demo/commits/2495d7829f7cd0cda9a19ee9831bff8204694295))
* **script:** refactor of preparation script ([2e97175](https://github.com/mokkapps/changelog-generator-demo/commits/2e971754da7887c2f77fa02c52ae482080199fb6))
* **scripts:** add license and author references to scripts ([d464d91](https://github.com/mokkapps/changelog-generator-demo/commits/d464d9155898e57be7b2805144bf381f047597ca))
* **scripts:** refactor entire script base of schema ([55fd939](https://github.com/mokkapps/changelog-generator-demo/commits/55fd939f013f2221af63529a79a8b134281a5c64))
* **scripts:** refactor publishing scripts (NuGet & NPM) ([a2136c3](https://github.com/mokkapps/changelog-generator-demo/commits/a2136c3fcb16007dfd237e1a0d8689be6649ecfa))

### [0.2.4](https://github.com/mokkapps/changelog-generator-demo/compare/v0.2.3...v0.2.4) (2024-02-23)

### Features

* **settings:** add new labels into the YAML settings for issues and pull requests ([9963590](https://github.com/mokkapps/changelog-generator-demo/commits/99635902cd1c72b07f46bf8a0444334a6440dd83))

### Documentation

* **readme:** little refactor for READMEs ([13b8ad0](https://github.com/mokkapps/changelog-generator-demo/commits/13b8ad01338d1a0649e25549a3b5db292f2a7b18))

### Common

* **script:** move preparation scripts to `ts-node` ([c5f2161](https://github.com/mokkapps/changelog-generator-demo/commits/c5f2161d06402b0846556814e2915cebd53c8a59))

### Build system

* **config:** update of `jsconfig.json` ([a8521e0](https://github.com/mokkapps/changelog-generator-demo/commits/a8521e06349e90a71899c06313c229711296847e))
* **deps-dev:** add Docker and Kubernetes support ([b037dbf](https://github.com/mokkapps/changelog-generator-demo/commits/b037dbf329af81613302cb5cd04675ece4227f24))
* **deps-dev:** bump chai from 4.3.10 to 5.0.0 ([ca2fbdc](https://github.com/mokkapps/changelog-generator-demo/commits/ca2fbdc7611f4f9cfd1af7cf058459cc3a5c5a60))
* **deps-dev:** bump chai from 4.3.10 to 5.0.0 ([08f024b](https://github.com/mokkapps/changelog-generator-demo/commits/08f024be4c82c647409a382f2bdedcb2121507d2))
* **deps-dev:** bump dotenv-safe from 8.2.0 to 9.0.0 ([ad20119](https://github.com/mokkapps/changelog-generator-demo/commits/ad2011951a6b3ba81b2aeba379e24dbac75a4a55))
* **deps-dev:** bump dotenv-safe from 8.2.0 to 9.0.0 ([b89845e](https://github.com/mokkapps/changelog-generator-demo/commits/b89845e71a305472166bbbed7fcaeeb0154fea33))
* **deps-dev:** bump husky from 8.0.3 to 9.0.10 ([0929f51](https://github.com/mokkapps/changelog-generator-demo/commits/0929f5198e6547754e92d1f925421fe858904de8))
* **deps-dev:** bump husky from 8.0.3 to 9.0.10 ([0d432bf](https://github.com/mokkapps/changelog-generator-demo/commits/0d432bf0500e66ddb03bb10ef8e89b2b5f1c22a4))
* **deps-dev:** bump markdownlint from 0.31.1 to 0.32.1 ([c230847](https://github.com/mokkapps/changelog-generator-demo/commits/c230847a7f8b440d39b9fa08588780acc405d914))
* **deps-dev:** bump markdownlint from 0.31.1 to 0.32.1 ([1679173](https://github.com/mokkapps/changelog-generator-demo/commits/16791730e7736d9bd5dff761888529d7ce095914))
* **deps-dev:** bump markdownlint from 0.32.1 to 0.33.0 ([76e8683](https://github.com/mokkapps/changelog-generator-demo/commits/76e868362a85a8c1577b3034a8b8470abfe1d9ff))
* **deps-dev:** bump markdownlint from 0.32.1 to 0.33.0 ([00dda94](https://github.com/mokkapps/changelog-generator-demo/commits/00dda944dfc535a20437bea24a302b1f4306c290))
* **deps-dev:** bump markdownlint-cli2 from 0.10.0 to 0.11.0 ([5ee237b](https://github.com/mokkapps/changelog-generator-demo/commits/5ee237b6d8cc576b7f3a14a2a74c6b1ca5884e48))
* **deps-dev:** bump markdownlint-cli2 from 0.10.0 to 0.11.0 ([#10](https://github.com/Falcion/Patternugit/issues/10)) ([15ec9b8](https://github.com/mokkapps/changelog-generator-demo/commits/15ec9b87fb74c45ee218cd5d0f4484dbf0b7d45d))
* **deps-dev:** bump markdownlint-cli2 from 0.11.0 to 0.12.1 ([60a9bae](https://github.com/mokkapps/changelog-generator-demo/commits/60a9bae5455017db9e4eb4f445ea9c21114f62d0))
* **deps-dev:** bump markdownlint-cli2 from 0.11.0 to 0.12.1 ([497b048](https://github.com/mokkapps/changelog-generator-demo/commits/497b048b2e122c6ead7cec7be9ad47e4ccc51002))
* **deps-dev:** bump typescript from 4.9.5 to 5.3.3 ([f2fef94](https://github.com/mokkapps/changelog-generator-demo/commits/f2fef94538186ad95961b3e5628a1f92daef6b7d))
* **deps-dev:** bump typescript from 4.9.5 to 5.3.3 ([d0f9f27](https://github.com/mokkapps/changelog-generator-demo/commits/d0f9f27d2c8a06ccceb77be725e71882f122c77b))
* **deps-dev:** update package versioning in root ([2e3a69d](https://github.com/mokkapps/changelog-generator-demo/commits/2e3a69df81a9de4d2b42441130e7160f612a1ab7))
* **deps:** change POSIX and matrix in CodeQL ([052aaa9](https://github.com/mokkapps/changelog-generator-demo/commits/052aaa9535ac9df07a17e4960189c5de54fab2c9))
* **deps:** update most of dependencies and other ([cce3dc2](https://github.com/mokkapps/changelog-generator-demo/commits/cce3dc274de0917efec97785f65487492ca086a9))

### [0.2.3](https://github.com/mokkapps/changelog-generator-demo/compare/v0.2.2...v0.2.3) (2023-11-07)

### Fixes

* **core:** fix YAML exception in settings ([0d45e28](https://github.com/mokkapps/changelog-generator-demo/commits/0d45e28d12cb097ba8e4fccaaa732833d9965497))
* **docs:** fix issue templates and README ([4c4efa4](https://github.com/mokkapps/changelog-generator-demo/commits/4c4efa46bf477e2272ba0387222ab657e2fc0f81))
* **main:** fix type error in main typescript path ([b0ca21d](https://github.com/mokkapps/changelog-generator-demo/commits/b0ca21dea0072c887d4f96849ed46ffda72e88ae))
* **readme:** fix of footnotes in README ([31ef470](https://github.com/mokkapps/changelog-generator-demo/commits/31ef4701e79d194b38ee332d5a9a806c61b88254))
* **release:** last fix-update before finalizing release ([7cab19a](https://github.com/mokkapps/changelog-generator-demo/commits/7cab19a5cd5dec875310bbe48d51897b9a6c9b1d))

### [0.2.2](https://github.com/mokkapps/changelog-generator-demo/compare/v0.2.1...v0.2.2) (2023-11-03)

### Features

* **scripts:** add note and scripts for in-browser label clone ([3c90d67](https://github.com/mokkapps/changelog-generator-demo/commits/3c90d6717bd56778294901aec7941be498a39e6e))
* **workflow:** add app for automated settings ([33408a5](https://github.com/mokkapps/changelog-generator-demo/commits/33408a57428fd82bcdc963c2727c18bc511f1d64))

### Fixes

* **eslint:** remove markdownlint for code styling ([48cfc38](https://github.com/mokkapps/changelog-generator-demo/commits/48cfc383096cb83bc0035b378b142f8f30e8c294))

### [0.2.1](https://github.com/mokkapps/changelog-generator-demo/compare/v0.2.0...v0.2.1) (2023-10-30)

### Features

* **issues:** add universal issue template in .MD ([1f2295a](https://github.com/mokkapps/changelog-generator-demo/commits/1f2295a523d21b7937db03df26da85680342770e))
* **patcher:** add special git patcher for branches ([c0dc4e4](https://github.com/mokkapps/changelog-generator-demo/commits/c0dc4e4c03db7bb0a60acf049edcc175722fa68d))

### Common

* **corecode:** refactor the main entrance file and it's around ([0a3e72f](https://github.com/mokkapps/changelog-generator-demo/commits/0a3e72f44a658b5d302ffcb7dd5c9de6c784dc88))
* **docs:** delete unused legal files ([4aa2802](https://github.com/mokkapps/changelog-generator-demo/commits/4aa2802a37e5648baaea797a88496c2f0331cec4))
* **docs:** macroupdate for README and GIT specials ([f662019](https://github.com/mokkapps/changelog-generator-demo/commits/f6620191e377e3606a0f19628aa5fcb63d8f6784))

### Fixes

* **docs:** replaced special reference to stale project ([86d419e](https://github.com/mokkapps/changelog-generator-demo/commits/86d419e0e2ab78c62cb2dbd3ab648c44a41d0f76))
* **workflow:** fix automerging workflow for not seeking right token ([e0ac9fc](https://github.com/mokkapps/changelog-generator-demo/commits/e0ac9fc987bbf36e657b3876b2275e15654caad7))

## [0.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v0.1.0...v0.2.0) (2023-10-21)

### Build system

* **deps-dev:** bump @types/node from 20.8.4 to 20.8.6 ([7f41e89](https://github.com/mokkapps/changelog-generator-demo/commits/7f41e8978444a47747963e4330f74a424a306116))
* **deps-dev:** bump lint-staged from 14.0.1 to 15.0.1 ([516d9e6](https://github.com/mokkapps/changelog-generator-demo/commits/516d9e60a60b2ca150c18bc83976b586e7721b02))
* **deps:** bump tough-cookie and lint ([6ccf53a](https://github.com/mokkapps/changelog-generator-demo/commits/6ccf53a7b070b540201a908be18b6dfbc92df940))

### Common

* **code:** append the functionality of project ([23e4deb](https://github.com/mokkapps/changelog-generator-demo/commits/23e4debb3de2c4a266b3a4d2a5d0ed5f1422db24))

## 0.1.0 (2023-10-12)

### Common

* **add-on:** write advanced git docs ([54dd8d6](https://github.com/mokkapps/changelog-generator-demo/commits/54dd8d607f56a8846eb4a5415b70ecc811be5b95))
* **auto:** write tsconfig ([ae5c17a](https://github.com/mokkapps/changelog-generator-demo/commits/ae5c17af8e42ce82c83343effd6cc4e3f30d4369))
* **code:** main code for template ([24534a1](https://github.com/mokkapps/changelog-generator-demo/commits/24534a1d74fb23060b101909d6f739169d92f831))
* **codeql:** write codeql workflows ([733704a](https://github.com/mokkapps/changelog-generator-demo/commits/733704a1392906445cfb190170302405a7b6cf48))
* **docs:** write a docs for repository ([c3f8561](https://github.com/mokkapps/changelog-generator-demo/commits/c3f8561c0804a527186cbff6efc0bd02f5232bcf))
* **husky:** write husky automation ([58c1178](https://github.com/mokkapps/changelog-generator-demo/commits/58c11783eec5f511a29a35e23e13a997a0b02741))
* **issues:** write issues templates and config ([df85c33](https://github.com/mokkapps/changelog-generator-demo/commits/df85c33b69f9c28e9b7a3f0352e71741e33f1908))
* **license:** write primordial licenses ([448b8be](https://github.com/mokkapps/changelog-generator-demo/commits/448b8bef76991b01d8ca9f82951db8f7141629bd))
* **micro:** create formatting and extend files ([41c4e9c](https://github.com/mokkapps/changelog-generator-demo/commits/41c4e9cfc5ad40ec7582a925632fca0f46bea896))
* **misc:** write an additional files for entire context ([8dae774](https://github.com/mokkapps/changelog-generator-demo/commits/8dae77463fcda7dae35713091c6cfb3d99837dbc))
* **pr:** pull request template ([2bd2dba](https://github.com/mokkapps/changelog-generator-demo/commits/2bd2dba4d29b469338a27a8b95d3afedf4925c7f))
* **readme:** write readme for instructions and for repo showcase ([b5a7b3d](https://github.com/mokkapps/changelog-generator-demo/commits/b5a7b3d65522c09b2756585524bb0cc6797a2a94))
* **scripts:** write add-on python scripts ([9373f15](https://github.com/mokkapps/changelog-generator-demo/commits/9373f155477201c1c5ab96bd3bd1e5207ed3d591))
* **scripts:** write js scripts and linter ([b61a373](https://github.com/mokkapps/changelog-generator-demo/commits/b61a3734aef150bd8a4384a2a44d50c48e928b04))
* **scripts:** write python scripts ([b568f6f](https://github.com/mokkapps/changelog-generator-demo/commits/b568f6f493035e0482583bb4402f93fcc981830f))
* **scripts:** write python-lib scripts ([6e1948e](https://github.com/mokkapps/changelog-generator-demo/commits/6e1948e314c4619ab4e2e71c5a102d4fe5f3da7d))
* **scripts:** write shell scripts ([31daaa7](https://github.com/mokkapps/changelog-generator-demo/commits/31daaa714e2e16a1ed46ffc6c4d456c9d025497e))
* **workflows:** write default workflows ([6762f77](https://github.com/mokkapps/changelog-generator-demo/commits/6762f77679e768d9a2d742cd73279faa72c551fe))

### Fixes

* **readme:** fix in readme of topics ([e214a4e](https://github.com/mokkapps/changelog-generator-demo/commits/e214a4ec8f363cdac3342bcbd7fdef28d3355914))
* **workflows:** fix of entirety of workflows ([5a1ea4a](https://github.com/mokkapps/changelog-generator-demo/commits/5a1ea4a816ee9017a33dfb68e714a6b47118f59e))

<!--
 This changelog file will be automatically updated by pending husky-hook scripts and commit's linters, but, it can also be edited in dependent case.
 -->
