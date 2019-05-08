# Contributing
## Dependencies
- Node.js >= 10

## Installation
```
npm install & ./node_modules/.bin/lerna bootstrap
```

## Build
Copy `.env.exmaple` as `.env`
```
cp .env.exmaple .env
```

Watch changes:
```
npm run watch
npm run start
```

Production build:
```
npm run build
npm run start
```

## i18n
Follow base locale:
```
npm run manage:translations
```
