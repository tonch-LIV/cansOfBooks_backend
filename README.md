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
- `lab02Mongo` branch created.
  - defined `MONGODB_URI`; `.env` | added to `server.js` to create connection to MongoDB.
  - created `models` directory and `Books.js` within.
  - created schema and exported / imported; `Book.js` -> `server.js`.  
  - added `/books` route as `async();`; `server.js`.
- 07.02; `lab02Mongo`
  - created `seeds.js` for starter code / book entries.
  - `node seed.js` hangs when ran; MongoDB miscommunication between Windows and WSL localhost's...
    - run `node seed.js` from same terminal window as `node server.js`.
  - moved `mongoose.connect` inside `seedBooks();` and made into `await`.
  - added `await Book.deleteMany({})` to avoid duplicates on server startup; `seed.js`.
  - imported `cors()` to allow frontend to communcate with backend; `server.js`.
  - added code ton teach Express how to read icnoming requests in JSON format; `app.use(express.json());`; `server.js`.
  - also added `app.post('/books', ...)` to listen for `POST` requests to `/books`; `server.js`.
  - added `await` to explicitly wait for the connection to close; `seed.js`.
  - updated `app.post('/books'...)` to better validate request and reject incomplete requests; `server.js`.
  - updated `catch` to include error context; `server.js`.
  - implement destructuring for `req.body`; `app.post('/books'..`; `server.js`.
  - added `try... catch`; `app.get('/books'`; `server.js`.
  - *troubleshooting*
    - corrected `MONGODB_URI` address; `.env`.
    - created `testConnection.js`.
    - modified `mongoose.connect` to include error catching; `server.js`.
    - still debugging... lots of console.logs.
      - **If MongoDB Atlas reports `self-signed certificate in certificate chain`; check network first. The cause may be TLS inspection by the organization's network infrastructure rather than a problem with the application.**
    