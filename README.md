# devise-token-auth-vue

Nuxt 3/Vue 3 compatible type safe APIs for [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth)

## Getting started

See the [auth plugin in playground/nuxt](./playground/nuxt/plugins/auth.ts) to get started

### Typescript "module not found" error

This probably happens due to the typescript not using package.json exports. 

I didn't really have time to debug this further, but for now adding this to `tsconfig.json` fixes the issue:

```jsonc
// tsconfig.json

{
  "compilerOptions": {
    "paths": {
      "devise-token-auth-vue": ["node_modules/devise-token-auth-vue/src/"],
      "devise-token-auth-vue/*": ["node_modules/devise-token-auth-vue/src/*"]
    }
  }
}
```
