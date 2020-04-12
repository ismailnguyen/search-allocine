# search-allocine
Allocine Search API client

## Install

### Local

#### Install packages
```
npm install
```

#### Start server
```
npm start
```

### Cloud (AWS Lambda)

#### Install tools
```
npm install -g serverless
```

#### Install packages
```
npm install
```

#### Deploy
```
sls deploy
```

More about AWS Lambda deployment here : [https://serverless.com/blog/serverless-express-rest-api/](https://serverless.com/blog/serverless-express-rest-api/)

## Usage

Search by film name
```
<domain>/<film name>
```

Search by film name at a given page
```
<domain>/<film name>/<page number>
```