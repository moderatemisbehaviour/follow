For the `updatePopularities` script to work a private key must be set in an environment variable.
This can be a bit tricky because the private key is serialised as JSON
which means that the new line characters in the private key are escapted as `\n`.

For the private key to be used it needs to be deserialised. This could be done by using `JSON.parse` at runtime
but it is easier to do this when setting the environment variable in the first place.

When using Heroku config vars to set the environment variable this can be done by manually replacing the escaped
newlines with actual new lines in an editor and then setting using the heroku CLI.

You can replace `\n` with an actual new line in VS Code by using the find and replace feature and typing
`command + enter` in the *replace* field.

If you ever need to enter a private key directly into a `.env` file (perhaps for local testing) then surround the
entire key with single quotes to make it a string literal and therefore escape the new line characters.