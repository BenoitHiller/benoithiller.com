This is the source code for [benoithiller.com](https://benoithiller.com).

It is written using Next.js 15 and React 19 mostly to play around a bit with the changes to both since I've last worked with them. That is why I'm not using a pre-made template or a tool that provides more of the functionality of a personal site/blog out of the box.

## Usage

The `package.json` has the default Next.js actions configured: `start`, `dev`, `build`, and `lint`.

To run the service locally first install the dependencies:

```bash
npm install
```

Then simply start the dev server:

```bash
npm run dev
```

### Building

The project will build and deploy itself to GitHub Pages using the action configured in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) when a commit is pushed to `main`.

To build the project locally use:

```bash
npm run build
```

The built static site will be placed in the `out` directory by default.

## License

This work is licensed under the MIT-0 license with the exception of the contents of the `src/blog` folder for which all rights are reserved. Note that the rendered blog pages grant additional licenses to their contents that are documented therein.
