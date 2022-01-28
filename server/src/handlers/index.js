const html = () => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Paste Story</title>
        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.3/css/bulma.min.css" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/bulma-divider.min.css">
        <link rel="shortcut icon" href="https://img.icons8.com/stickers/100/000000/paste.png" />
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
            body {
            font-family: 'Nunito', sans-serif;};
            nav.navbar {
            height: 6rem !important;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06) !important;
            }
        </style>
        <script>
            const sendMutation = (query) => {
                return fetch('/__graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                })
                    .then((res) => {
                        if (!res.ok) throw new Error(res.statusText)
                        return res.json()
                    })
                    .catch((err) => console.log(err))
            }
            
            const createPaste = async (e) => {
                e.preventDefault()
            
                const pasteContent = document.getElementById('content').value
            
                const response = await sendMutation(
                    \`
                        mutation {
                            createPaste(content: """\${pasteContent}""") {
                                uuid
                                content
                            }
                        }
                    \`,
                )
                
                const data = response.data
                
                if (data) {
                    // Redirect to the new paste
                    window.location.href = "/" + data.createPaste.uuid
                } else {
                    alert('⛔ Daily Limit Exceeded')
                }
            }
            
        </script>
    </head>
    <body>
        <section class="hero ">
            <div class="hero-body">
                <div class="container">
                    <section class="section">
                        <div class="columns">
                            <div class="column is-8 is-offset-2">
                                <div class="content is-medium">
                                    <h1 class="title">Paste story</h1>
                                    <p>A <a href="https://pastebin.mozilla.org/">Pastebin</a> POC built using <a href="https://workers.cloudflare.com/">Cloudflare Worker</a> and <a href="https://www.cloudflare.com/products/workers-kv/">KV</a>.
                                    </p>
                                    <p>Check out the <a href="https://github.com/ngshiheng/paste-story">source code</a>.
                                    </p>
                                    <form onsubmit="createPaste(event)">
                                        <div class="form-group">
                                            <textarea id="content" style="height: 1000px" class="textarea" placeholder="e.g. Hello, 世界"></textarea>
                                        </div>
                                        <div class="form-group text-center">
                                            <button type="submit" class="button is-medium is-fullwidth is-primary">Create New Paste</button>
                                        </div>
                                    </form>
                                    <div class="column is-8 is-offset-2">
                                        <nav class="level">
                                            <div class="level-right">
                                                <small class="level-item" style="color: var(--textLight)">
                                                &copy; Paste Story by&nbsp<a href="https://jerrynsh.com/">Jerry Ng</a>. All Rights Reserved.
                                                </small>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="is-divider"></div>
                </div>
            </div>
        </section>
    </body>
</html>
`

/*
Render the front page of Paste Story.
*/
const handler = () =>
    new Response(html(), {
        headers: { 'Content-Type': 'text/html' },
    })

module.exports = handler
