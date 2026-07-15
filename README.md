# Dustella's Candystore

Dustella's personal blog, powered by VitePress and Nolebase integrations.

## Development

The project uses Node.js 24 and [pnpm](https://pnpm.io/) for local development
and CI:

```shell
pnpm install
pnpm dev
```

Write articles in `site/blogs`; they are automatically sorted into the blog
list pages. Run `pnpm build` for a production build and `pnpm typecheck` to
validate the TypeScript and Vue sources.

The production artifact in `site/.vitepress/dist` is deployed by GitHub Actions
to both GitHub Pages and Tencent EdgeOne Pages.
