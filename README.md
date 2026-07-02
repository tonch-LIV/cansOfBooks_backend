# changeLog

- retrospective changes / additions
  - basic Express server inside `server.js` with `/` route.
  - `express`, `cors`, `dotenv`, and `axios` installed and present in `package.json`.
  - `.env` and `node_modules` include in `.gitignnore`.

- 07.01
  - created `README.md`.
  - installed `mongoose`; a library that allows node / express to talk to MongoDB through schemas and models.
    - confirmed in `package.json`; `"mongoose": "^9.7.3"`.
  - turned on MongoDB in terminal before proceeding further.
  - added / 'imported' `mongoose` to let server talk to MongoDB and `dotenv` to let server read values from ''; `server.js`.
  - defined `MONGODB_URI`; `.env` | added to `server.js` to create connection to MongoDB.
