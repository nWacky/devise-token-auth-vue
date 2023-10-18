# devise-token-auth-vue

Nuxt 3/Vue 3 compatible API wrapper for [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth)

## Warning: unstable api

The api in this repository in not stable.

When installing, add commit hash

```jsonc
// package.json
{
  "dependencies": {
    "devise-token-auth-vue": "github:nWacky/devise-token-auth-vue#<commit_hash>"
  }
}
```

## Getting started

See the [auth plugin in playground/nuxt](./playground/nuxt/plugins/auth.ts) for usage example

### Typescript "module not found" error

This probably happens due to the typescript not using package.json exports.

### For nuxt

Fix the issue with nuxt 3:

```ts
// nuxt.config.ts

import { fileURLToPath } from "url";

export default defineNuxtConfig({
  alias: {
    // otherwise there's a "module-not-found-error"
    //
    // see https://github.com/nWacky/devise-token-auth-vue
    "devise-token-auth-vue": fileURLToPath(
      new URL("node_modules/devise-token-auth-vue/src/", import.meta.url)
    ),
  },
});
```

### fix manually in tsconfig.json

I didn't really have time to debug this further, but for now the library to `tsconfig.json` fixes the issue:

```jsonc
// tsconfig.json

{
  "compilerOptions": {
    "paths": {
      // TODO: make sure other paths are not overwritten!

      "devise-token-auth-vue": ["node_modules/devise-token-auth-vue/src/"],
      "devise-token-auth-vue/*": ["node_modules/devise-token-auth-vue/src/*"]
    }
  }
}
```

## Development

This repository is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
