# JAI_fullstack_application

This is a full-stack application built with Node.js and Postgres.

## Requirements

* Node version 18.2
* Postgres DB installed

## How to run this app

### Server setup

1. Change your terminal directory to `servers`.
2. Install all the packages: `npm i`.
3. Create Postgres database: `npx sequelize-cli db:create`.
4. Migrate entities to database: `npx sequelize-cli db:migrate`.
5. Seed users entity to database: `npx sequelize-cli db:seed:all`.
6. Run the servers: `npx nodemon app.js`.

### Client setup

1. Change your terminal directory to `client`.
2. Install all the packages: `npm i`.
3. Run the App : `npm run dev`


## Note

The application already has two registered user accounts:

* User1:
    * email: `user1@user.com`
    * password: `12345`
* User2:
    * email: `user2@user.com`
    * password: `12345`

## Author

This application was created by [Dheo Abdullah](https://github.com/dheoab).
