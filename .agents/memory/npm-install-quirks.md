---
name: npm-install-quirks
description: npm 10.8.2 crash on Invalid Version during idealTree when certain packages are present
---

## Rule
Remove `volar-service-vetur` from dependencies and avoid `eslint-plugin-vue@^9.x` (use v8 instead). Both pull transitive deps that cause npm 10.8.2 to crash with `Invalid Version` during `idealTree:buildDeps`.

**Why:** npm's `canDedupe` method calls `semver.gte(other.version, this.version)` and crashes when any package in the resolution tree has an empty version string. The `volar-service-vetur` → `vls` → `eslint-plugin-vue@^9` chain introduces `vue-eslint-parser` which triggers this code path. Also, the `firestore@1.1.6` standalone npm package requires `lodash@^3.1.0` which is CVE-blocked by Replit's security policy.

**How to apply:** When setting up this project, ensure `package.json` does NOT have `volar-service-vetur`, `firestore` (standalone), or `eslint-plugin-vue@^9.x`. Use `eslint-plugin-vue@^8.0.0` instead.

Also, the npm `overrides` field itself causes the same crash — do not use it.
