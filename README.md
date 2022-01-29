<h1 align="center"><strong>Paste Story</strong></h1>

Paste Story is a [Pastebin](https://pastebin.com/) clone — a web service that allows users to share text content through a link.

“Why Pastebin?” you might ask. Well, sending ≥ 50 lines long block of text (code) within a chat app isn’t exactly the best way to share.

## Requirements

-   Get a [Cloudflare](https://www.cloudflare.com/) account.
-   Install [Wrangler](https://github.com/cloudflare/wrangler#installation) CLI for Cloudflare Workers deployment.

## Setup

Check out Steps 1 to 3 of this [Get Started Guide](https://developers.cloudflare.com/workers/get-started/guide).

### Installation

See `README.md` of the respective service.

### Creating KV

Since we're using KV as our storage, we need to first create it.

```sh
# Production namespace:
wrangler kv:namespace create "PASTE_DB"
wrangler kv:namespace create "KEY_DB"

# This namespace is used for `wrangler dev` local testing:
wrangler kv:namespace create "PASTE_DB" --preview
wrangler kv:namespace create "KEY_DB" --preview
```

For creating these KV namespaces, remember to update your [`wrangler.toml`](./wrangler.toml) files of the respective service to include the namespace bindings accordingly.

Feel free to update your `account_id` accordingly while you are at it.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Steps

1. Fork this
2. Create your feature branch (`git checkout -b tom/fooBar`)
3. Please make sure you have installed the `pre-commit` hook and make sure it passes all the lint and format check
4. Commit your changes (`git commit -am 'feat: add some fooBar'`, make sure that your commits are [semantic](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716))
5. Push to the branch (`git push origin tom/fooBar`)
6. Create a new Pull Request
