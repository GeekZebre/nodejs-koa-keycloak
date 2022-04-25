# Creation

Suivi de la procedure de cet article  
https://dev.to/ebrahimmfadae/develop-an-openid-server-with-nodejs-typescript-9n1  

## Config npm

```bash
$ npm init -y
```

## Config Typescript

```bash
$ npm add typescript ts-node
$ npm add @types/node -D
```

Create a tsconfig.json file with this content.
```js
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "allowJs": true,
    "strict": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Add npm scripts

We can run scripts with npm run or yarn run command.
```json
{
  "start": "ts-node src"
}
```

## About the env variables (IMPORTANT)

We use motdotla/dotenv library (https://github.com/motdotla/dotenv).  
It's to inject variables in oidc/.env which you can find here (https://github.com/ebrahimmfadae/openid-connect-app/blob/main/oidc/.env).  
For app and api also you must provide .env file.  
These are also included in the tutorial repository.  

Don't worry about configuring dotenv. Just go with the tutorial and everything will fit in place.  

```bash
$ npm add dotenv
```


Create a .env file with this content.
```bash
PORT=3000
```

## Add Server dependencies

```bash
$ npm add koa
$ npm add @types/koa -D
$ npm add @koa/cors
$ npm i --save-dev @types/koa__cors
```

## Add OpenId Connect dependencies

```bash
$ npm add openid-client koa-passport koa-session
$ npm add @types/koa-passport -D
```
## Article suivi

https://medium.com/keycloak/keycloak-express-openid-client-fabea857f11f  
https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5  
https://github.com/austincunningham/keycloak-express-openid-client  





