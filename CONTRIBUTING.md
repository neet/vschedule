# Contributing
## Dependencies
- Node.js >= 10
- Yarn

## Installation
```
yarn
```

## Build
Copy `.env.exmaple` as `.env`
```
cp .env.exmaple .env
```

Watch changes:
```
yarn run watch
yarn run start
```

Production build:
```
yarn run build
yarn start
```

### Alternative Way (Docker)
```
docker build . -t refined-itsukara-link:latest
dokcer run -d --env-file=.env refined-itsukara-link:latest
```

## i18n
Follow base locale:
```
yarn run manage:translations
```
