# Truffle React example project

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/df47b7a5ca36487082a64c910f2e8e77)](https://app.codacy.com/manual/tomasBustamante/truffle-react?utm_source=github.com&utm_medium=referral&utm_content=tomasBustamante/truffle-react&utm_campaign=Badge_Grade_Dashboard)

## Prerequisites

- truffle
- node

## Install

```console
cd client
npm i
```

## Run locally

### Client side

```console
cd client
npm run start
```

### Server side

```console
truffle develop
```

Once inside truffle:

```console
truffle compile
truffle migrate
```

When a contract gets updated run following:

```console
truffle migrate --reset
```
