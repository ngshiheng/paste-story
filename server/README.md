# GraphQL API Server

## Requirements

-   Install [Wrangler](https://github.com/cloudflare/wrangler#installation) CLI for Cloudflare Workers deployment.

## Installation

```sh
npm ci
```

## Development

For local development, run:

```sh
wrangler dev
```

## Deployment

The deployment of this project is done using GitHub Actions CI/CD. For more details, check out [server.yml](../.github/workflows/server.yml)

Alternatively, to publish any new changes to your Cloudflare Worker, run `wrangler publish`.

Before publishing your code you need to edit [`wrangler.toml`](./wrangler.toml) file and add your Cloudflare `account_id` - more information about configuring and publishing your code can be found [in the documentation](https://developers.cloudflare.com/workers/learning/getting-started#7-configure-your-project-for-deployment).

# References

-   https://github.com/kwhitley/itty-router
-   https://github.com/kwhitley/itty-router-extras
-   https://github.com/cloudflare/workers-graphql-server
