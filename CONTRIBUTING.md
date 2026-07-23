# Contributing to nestjs-duckdb

Thanks for wanting to contribute - this project welcomes issues, bug fixes, docs improvements, and new features.

## Getting started

1. **Fork** this repo and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nestjs-duckdb.git
   cd nestjs-duckdb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a branch** for your change:
   ```bash
   git checkout -b fix/short-description
   # or: feat/short-description, docs/short-description
   ```

## Making changes

- Source code lives in `src/`
- Tests live in `test/` - please add/update a test for any behavior change
- Run the test suite before opening a PR:
  ```bash
  npm test
  npm run build
  ```
- Try your change against the example app in `examples/basic-app` if it touches the public API:
  ```bash
  npm run build
  npm link
  cd examples/basic-app
  npm install
  npm link nestjs-duckdb
  npm run start:dev
  ```

## Submitting a pull request

1. Push your branch to your fork:
   ```bash
   git push origin fix/short-description
   ```
2. Open a PR against `main` on this repo.
3. Describe **what** changed and **why** - link any related issue.
4. CI (GitHub Actions) will run the build and test suite automatically. Please make sure it's green before requesting review.

## Reporting bugs / requesting features

Open a [GitHub Issue](../../issues) - include:
- What you expected to happen vs. what actually happened
- A minimal code sample to reproduce, if it's a bug
- Your Node, NestJS, and DuckDB versions

## Code style

- TypeScript, strict mode
- Keep the `forRoot`/`forRootAsync` pattern consistent with other NestJS ecosystem modules (`@nestjs/typeorm`, `@nestjs/mongoose`, etc.) if you're extending configuration options
- Run `npm run lint` before submitting

## License

By contributing, you agree your contributions will be licensed under the project's [MIT License](./LICENSE).
