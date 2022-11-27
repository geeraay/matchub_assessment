# React TS - NestJs Boilerplate

The architecture of this boilerplate contains of two parts, which are backend and frontend. The development process using Node.js version 16.13.2.

## Backend - (NestJs)

This part of boilerplate act as backend server whose serves data using REST API endpoints. The backend is modified from this [post](https://arctype.com/blog/sqlite-nestjs-tutorial/) in this [repository](https://github.com/Claradev32/ecomerce). It uses NestJs, TypeORM, and SQLite. The endpoints are guarded with JWT authentication.

### Packages used

- SQLite (To make things portable without requiring any additional installation of DBMS)
- TypeORM
- JWT

### How to run:

Navigate to backend folder

```
cd ./backend
```

then, install the dependencies

```
npm install
```

then, to run development mode

```
npm run start:dev
```

access the endpoints with base url

```
localhost:3001/api/v1/
```

## Frontend - React Typescript

This part of boilerplate act as user interface website which uses [Chakra-UI](https://chakra-ui.com/) component library to speed up the development process. Navigation inside the website utilizes [react-router-dom](https://reactrouter.com/en/main) version 6. To fetch the data from backend server, it uses [Axios](https://axios-http.com/docs/intro). This boilerplate uses [react-hook-form](https://react-hook-form.com/), and using [chakra-dayzed-datepicker](https://github.com/aboveyunhai/chakra-dayzed-datepicker) for datepicker component.

### Packages used

- axios
- chakra-dayzed-datepicker acquired from [here](position="relative")
- chakra-ui
- react-router-dom
- react-hook-form

### How to run:

Navigate to frontend folder

```
cd ./frontend
```

then, install the dependencies

```
npm install
```

then, to run development mode

```
npm run start
```

access the development website at

```
localhost:3000
```
