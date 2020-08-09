[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8ddb3b94e73045c68e3b7721c3b3fca4)](https://www.codacy.com/manual/tomasBustamante/crypto-tienda?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomasBustamante/crypto-tienda&amp;utm_campaign=Badge_Grade)
![GitHub](https://img.shields.io/github/license/tomasBustamante/crypto-tienda)
[![Build Status](https://travis-ci.com/tomasBustamante/crypto-tienda.svg?branch=master)](https://travis-ci.com/tomasBustamante/crypto-tienda)

# Crypto Tienda

## Pre-requisitos

- truffle
- node (usamos la versión lts con nvm)

## Instalación

```console
cd client
npm i
```

## Ejecución local

### Servidor

```console
truffle develop
```

Dentro de truffle:

```console
truffle compile
truffle migrate --reset
```

### Cliente

```console
cd client
npm run start
```

## Ejecución de las pruebas

```console
truffle test
```

## Licencia

Esté proyecto está bajo la licencia MIT - ver el archivo [LICENSE.md](https://github.com/tomasBustamante/crypto-tienda/LICENSE) para más detalles.
