<h1 align="center">
  <br>
  <a href=""><img src="./images/logo.png" alt="Booking Backend" width="200"></a>
  <br>
  Booking Backend
  <br>
</h1>

<h4 align="center">A Booking Room Backend built on top of <a href="https://nestjs.com/" target="_blank">Nest JS</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#folder-structure">Folder Structure</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Booking Database Design: [View](https://dbdiagram.io/d/606c8aa3ecb54e10c33ef485)
- API Document: docs/api.md

- [x] User Module

  - GET: Get List Users: `/api/users`
  - GET: Search Users: `/api/users` + `Params`
  - POST: Register: `/auth/register` + `Body`
  - POST: Login: `/auth/login` + `Body`

- [x] Room module

  - GET: Get List Room: `/api/room`
  - GET: Search Room: `/api/room` + `Params`
  - POST: Create new room: `/api/room` + `Body`
  - GET: Room Detail: `/api/room/:id`
  - PUT: Edit Room: `/api/room/:id` + `Body`
  - Delete Room: `/api/room/:id`

- [x] Order module

  - GET: Get List Orders: `/api/order`
  - GET: Search Orders: `/api/order` + `Params`
  - POST: Create new order: `/api/order` + `Body`
  - GET: Order Detail: `/api/order/:id`
  - PUT: Edit Order: `/api/order/:id` + `Body`
  - Delete Order: `/api/order/:id`

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) and [Postgresql](http://postgresql.org/download/) installed on your computer. From your command line:

```bash
# Clone this repository

# Go into the repository
$ cd booking-backend

# Install dependencies
$ yarn install

# Connect database

# Run the app
$ yarn start:dev


```

## Folder Structure

```
booking-backend/
└── src
    ├── 📔 common
    ├── 📒 entities
    ├── 📘 interfaces
    ├── 📖 modules
    ├── 📓 paginate
    ├── 📚 shared
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    └── main.ts
└── ormconfig.json

└── package.json
```

- `app.controller.spec.ts`: The unit tests for the controller.
- `app.controller.ts`: A basic controller with a single route.
- `app.module.ts`: The root module of the application.
- `app.service.ts`: A basic service with a single method.
- `main.ts`: mock data.
- `themes`: The entry file of the application which uses the core function NestFactory to create a Nest application instance.
- `package.json`: This File has the list of node dependencies which are needed.

## Credits

This software uses the following open source packages:

- [NestJS](https://nestjs.com/) : A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [dotenv](https://github.com/motdotla/dotenv) : Loads environment variables from .env for nodejs projects.
- [pg](https://yarnpkg.com/package/pg) :PostgreSQL client - pure javascript & libpq with the same API.
- [typeorm](https://typeorm.io/#/) :TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.
- [rxjs](https://yarnpkg.com/package/rxjs) : Reactive Extensions for modern JavaScript.

**[⬆ back to top](#key-features)**
