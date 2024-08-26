# Doc Crypt

Simple API layer on top of SSL encryption.

The intent here is to keep our encryption concerns separate from the main
code and slightly simplifiy and isolate behavior we want from the
nodejs Crypto implementation and convert such into browser JS.

## Development

```shell
npm run bulid
git add -u
git commit -m "Checking in new build."

npm publish --access public
```