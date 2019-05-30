# selfkey-claim-registry
Public claim registry for Selfkey DIDs

* `develop` — <!--[![CircleCI](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/develop.svg?style=svg)](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/develop)--> [![codecov](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry/branch/develop/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry)
* `master` — <!--[![CircleCI](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/master.svg?style=svg)](https://circleci.com/gh/SelfKeyFoundation/selfkey-claim-registry/tree/master)--> [![codecov](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry/branch/master/graph/badge.svg)](https://codecov.io/gh/SelfKeyFoundation/selfkey-claim-registry)

## Overview

The `SelfKeyClaimRegistry` smart contract is a [ERC780](https://github.com/ethereum/EIPs/issues/780)-based implementation for storing public claims on-chain, with the following differences:

* Subject of a claim is a `bytes32` value, allowing arbitrary "things" to be the subject of a claim (e.g. a
hash of something, or a DID under the [SelfKey DID method](https://github.com/SelfKeyFoundation/selfkey-did-ledger))
* Claim issuer is _required_ to have a DID registered on the DID Ledger contract
* Transaction sender address for claim issuance and removal _must_ be equal to the DID controller specified

**Development Notes**:

* No expiration data is associated with claims, this could be implemented by having _value_ be a `struct` that
wraps the bytes32 value and other needed data such as expiration date.
* No permissioning schemes are implemented on this claims registry contract. Claim issuance is public.
* It's recommended to implement any additional customizations (e.g. permissioning, etc.) as smart contracts
inheriting from the basic registry.


## Development

All smart contracts are being implemented in Solidity `0.5.4`.

### Prerequisites

* [NodeJS](htps://nodejs.org), version 9.5+
* [truffle](http://truffleframework.com/), which is a comprehensive framework for Ethereum development. `npm install -g truffle` — this should install the latest version.

### Initialization

    npm install

### Testing

Truffle testing requires a `ganache-cli` instance running. In a different terminal window, execute:

    ganache-cli

#### Standalone

    npm test

or with code coverage (doesn't require ganache-cli)

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
