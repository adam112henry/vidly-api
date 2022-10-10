# vidly-api

Vidly is a node application hosting a RESTful API to service a movie rental business.\
A deployed version of this application is hosted on Heroku at [https://vidly-adamh.herokuapp.com/api/](https://vidly-adamh.herokuapp.com/api/). \
The database is mongodb hosted on [MongoDB Atlas](https://www.mongodb.com/atlas). \
Routing is handled by [Express](https://www.npmjs.com/package/express), security is implemented with [jwt](https://www.npmjs.com/package/jsonwebtoken), and [jest](https://www.npmjs.com/package/jest) for automated tests.

## Endpoints

The API supports the following endpoints: \
(check /models for data structures and /routes for supported verbs)

- [/api/genres](https://vidly-adamh.herokuapp.com/api/genres)
- [/api/customers](https://vidly-adamh.herokuapp.com/api/customers)
- [/api/movies](https://vidly-adamh.herokuapp.com/api/movies)
- [/api/rentals](https://vidly-adamh.herokuapp.com/api/rentals)
- [/api/returns](https://vidly-adamh.herokuapp.com/api/returns)
- [/api/users](https://vidly-adamh.herokuapp.com/api/users)
- [/api/auth](https://vidly-adamh.herokuapp.com/api/auth)  - generate an auth token after creating a user

## Local

- Mongodb must be installed and running locally, database name is 'vidly'.

- ### `> npm start`

- API will run on port 3001, for ex: [http://localhost:3001/api/movies](http://localhost:3001/api/movies)

## Automation tests

### `> npm test`

## Use Postman

Sample Postman requests are located in \Postman
