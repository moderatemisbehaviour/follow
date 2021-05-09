# Getting started

1. Run `yarn install` to install the dependencies.
2. Run `yarn start:dev` to start development.

- Starts a node server at http://localhost:4000
- Starts a webpack development server at http://localhost:4001 using React Scripts to host the front-end.
- Visit the GraphQL Playground at http://localhost:4000/graphql.

1. Run `yarn test:dev` to open the Cypress test runner.

# Other scripts

1. Run `yarn ci` to start the server and run Cypress headless.
2. Run `yarn start` to get a production build.

- Builds an optimised production build using React scripts.
- Starts a node server at http://localhost:4000 that also statically hosts the front-end.

# Tech stack

## Front-end

React & Apollo Client.

## API

Express & Apollo Server.

## Database

MongoDB.

### Schema

You can find a really bad and incomplete schema [here](https://mongo.tools/ed/project/5c27e6b7883bc061baacb0e7).
_TODO: Host an autogenerated schema somehow?_

## Infrastructure
Heroku.

# Testing

The philosophy on testing is simple. We don't ship unless we _know_ the app works as intended for the user.
We therefore do not ship unless our _acceptance tests_ pass.

## Acceptance tests

Acceptance tests are performed manually or with Cypress E2E tests.
These types of tests are the only way to _know_ the user will experience what we have intended.

Acceptance tests should have 100% coverage.

_Note: Once the API is public it will need to be acceptance tested too because API consumers are also users even if they don't interact with the app via a UI. At this point an API testing framework should be used in addition to Cypress._

## Unit & integration tests

Unit & integration tests are used to give us extra confidence in complex areas of code. They are _not_ acceptance tests. Ideally they should have no bearing on whether or not we ship.
They are development and maintenance aids that allow us to easily detect _potential_ problems in complex areas of code and find bugs but they are definitely not sources of truth for the correctness of the code. This is because design is always subject to change based on new requirements, and that's a good thing.

There are no requirements for coverage of unit & integration tests. If we are good developers then we will notice areas of complexity and want to write unit & integration tests for them because we know they are genuinely helpful over time. Specifically which style of test we write should be decided on a case-by-case basis depending on the area we want extra confidence in.

# SDLC

## Development

This occurs on the developer's local machine.
React scripts can be used to start the app as it provides a helpful hot-reloading development server.
Alternatively the `heroku local` command can be used for a slightly more live-like startup.
Regardless of the method for starting the app, `dotenv` is used to read the `.env` file which contains sane defaults like localhost:12707 for MongoDB which work both locally and on the CI environment.

## CI

Uses the default config in the `.env` file as services run locally.

## Feature

Reads environment variables from `app.json` which sets `NODE_ENV` to `review`.
The app can then inspect this variable and choose to override defaults loaded from `.env`.

## Staging

To be filled in.

## Production

The staging environment must be manually promoted to production.

# Analytics
Segment is used for analytics. For it to work a SEGMENT_WRITE_KEY environment variable must be set as well as NODE_ENV (see `client/public/analytics.js`).

# Ubiquitous language

A ubiquitous language allows concepts relating to this application to be discussed unambiguously.

### Publisher

An entity that publishes content.

### Subscriber

An entity that consumes content created by a _publisher_.

### Platform

A service used by _publishers_ for distributing their content.
E.g. Twitter, YouTube, Facebook.

### Profile

A representation of a person's online presence that encapsulates all the platforms they use.

# Code quality and style
ESLint is used to enforce quality and Prettier is used to enforce style.
The **eslint-config-prettier~** package is used to disable all formatting-related ESLint rules so that Prettier can do its thing.
The **eslint-plugin-prettier** package is used to run Prettier when ESLint is run.
So in short, ESLint auto-fix is all that needs to be run on a file to ensure general consistency.