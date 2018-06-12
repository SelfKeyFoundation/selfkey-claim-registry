# selfkey-claim-registry
Public claim registry for Selfkey DIDs

* `develop` — [![CircleCI](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/develop.svg?style=svg)](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/develop) [![codecov](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry/branch/develop/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry)
* `master` — [![CircleCI](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/master.svg?style=svg)](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/master) [![codecov](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry/branch/master/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry)

## Overview

The `ClaimRegistry` contract provides the following functionality.

1. Addresses are able to set any (32 byte) key-value associated with an arbitrary address which is
regarded as the "claim subject".

2. Only the original issuer of a given claim is able to remove it.

3. Anyone can get a specific claim made by an _issuer_ about a _subject_ via the `getClaim` method,
for verification purposes.

## Development

All smart contracts are being implemented in Solidity `0.4.23`.

### Prerequisites

* [NodeJS](htps://nodejs.org), version 9.5+ (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
* [truffle](http://truffleframework.com/), which is a comprehensive framework for Ethereum development. `npm install -g truffle` — this should install Truffle v4+.  Check that with `truffle version`.

### Initialization

    npm install

### Testing

#### Standalone

    npm test

or with code coverage

    npm run test:cov

#### From within Truffle

Run the `truffle` development environment

    truffle develop

then from the prompt you can run

    compile
    migrate
    test

as well as other Truffle commands. See [truffleframework.com](http://truffleframework.com) for more.

### Linting

We provide the following linting options

* `npm run lint:sol` — to lint the Solidity files, and
* `npm run lint:js` — to lint the Javascript.

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
