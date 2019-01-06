[![Build Status](https://semaphoreci.com/api/v1/moderatemisbehaviour/follow/branches/master/badge.svg)](https://semaphoreci.com/moderatemisbehaviour/follow)

# Getting Started
1. Run `npm install` to install the dependencies.
1. Run `npm run start:dev` to start development.
  - Starts a node server at http://localhost:4000
  - Starts a webpack development server at http://localhost:4001 using React Scripts to host the front-end.
1. Run `npm test` to open the Cypress test runner.
1. Run `npm start` to get a production build.
  - Builds an optimised production build using React scripts.
  - Starts a node server at http://localhost:4000 that also statically hosts the front-end.

# Tech Stack
## Front-end
React & Apollo

## API
Node & GraphQL

## Database
MongoDB is used and expected to be running locally on the default port during development.

### Schema
You can find a really bad and incomplete schema [here](https://mongo.tools/ed/project/5c27e6b7883bc061baacb0e7).
_TODO: Host an autogenerated schema somehow?_

# Testing
The philosophy on testing is simple. We don't ship unless we _know_ the app works as intended for the user.
We therefore do not ship unless our _acceptance tests_ pass.

## Acceptance Tests
Acceptance tests are performed manually or with Cypress E2E tests.
These types of tests are the only way to _know_ the user will experience what we have intended.

Acceptance tests should have 100% coverage.

_Note: Once the API is public it will need to be acceptance tested too because API consumers are users too, even if they don't interact with the app via a UI. At this point an API testing framework should be used in addition to Cypress._

## Unit & Integration tests
Unit & integration tests are used to give us extra confidence in complex areas of code. They are _not_ acceptance tests. Ideally they should have no bearing on whether or not we ship.
They are development and maintenance aids that allow us to easily detect _potential_ problems in complex areas of code and find bugs but they are definitely not sources of truth for the correctness of the code. This is because design is always subject to change based on new requirements, and that's a good thing.

There are no requirements for coverage of unit & integration tests. If we are good developers then we will notice areas of complexity and want to write unit & integration tests for them because we know they are genuinely helpful over time. Specifically which style of test we write should be decided on a case-by-case basis depending on the area we want extra confidence in.

## Deployment
The app can be deployed using Heroku which will run the following.
1. npm run start
2. npm run postinstall

# Ubiquitous language
A ubiquitous language allows concepts relating to this application to be discussed unambiguously.

### Publisher
An entity that publishes content.

### Subscriber
An entity that consumes content created by a _publisher_.

### Platform
A service used by _puslishers_ for distributing their content.
E.g. Twitter, YouTube, Facebook.