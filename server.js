// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));


// To be removed
const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "1"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "2"
  },
  b6UT5Q: {
    longURL: "https://www.amazon.ca",
    userID: "1"
  }
};

// To be removed: set up sample users
const users = {
  "1": {
    id: "1",
    email: "user@example.com",
    password: "1"
  },
  "2": {
    id: "2",
    email: "user2@example.com",
    password: "2"
  }
}

// To be removed: a function to find urls that a user owns and return urls as an object
const urlsForUser = function (id) {
  let urls = {};
  for (const url in urlDatabase) {
    if (id === urlDatabase[url]["userID"]) {
      urls[url] = urlDatabase[url]["longURL"];
    }
  }
  return urls;
}

// To be removed: Create new url
app.get("/urls/new/:id", (req, res) => {
  const user = users[req.params.id];
  const templateVars = { urls: urlDatabase, user: user };

  // Show create new url page
  res.render("urls_new", templateVars);
})

// To be removed: Show list of URLs from our URL database
app.get("/urls/:id", (req, res) => {
  const user = users[req.params.id];
  const templateVars = { urls: urlDatabase, user: user };

  res.render("urls_index", templateVars);
})

// To be removed: Show list of URLs from our URL database
app.get("/urls", (req, res) => {
  res.render("index");
})

// To be removed: Create URL record
app.post("/urls/:id", (req, res) => {
  const user = users[req.params.id];

  // user doesn't exist
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  // user exists and we generate a record in our url database
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = {};
  urlDatabase[shortURL]["longURL"] = req.body.longURL;
  urlDatabase[shortURL]["userID"] = user.id;

  res.redirect(`/urls/${user.id}`);
})

// To be removed: Function to generate a random alphanumeric user id
function generateRandomString() {
  // String to store all numbers and characters
  let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let randomString = '';

  // Randomly pick 6 elements from characters
  for (let j = 0; j < 6; j++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }

  return randomString;
}

// To be removed: Delete URL from our URL database and then redirect to urls page
app.post("/urls/:shortURL/delete/:id", (req, res) => {

  // If the user is not logged in, the app should return HTML with a relevant error message
  const user = users[req.params.id];

  // If a URL with the given id does not exist, the app should return HTML with a relevant error message
  if (typeof (urlDatabase[req.params.shortURL]) === "undefined") {
    return res.status(400).send("URL not found");
  }

  // User is logged in and the user is the owner of the URL, perform delete
  delete urlDatabase[req.params.shortURL];
  res.redirect(`/urls/${user.id}`);

})

// To be removed: Show page to Edit URL
app.get("/urls/:shortURL/:id", (req, res) => {
  const urls = urlsForUser(req.params.user_id);
  const lURL = urls[req.params.shortURL]
  const user = users[req.params.id];
  const templateVars = { longURL: lURL, shortURL: req.params.shortURL, user: user };

  res.render("urls_show", templateVars);
})


// To be removed: Update existing URL with new one and then redirect to urls page
app.post("/urls/modify/:shortURL/:id", (req, res) => {

  // If the user is not logged in, the app should return HTML with a relevant error message
  const user = users[req.params.id];


  // If the user is logged in but does not own the URL with the given id, the app should return HTML with a relevant error message
  const urls = urlsForUser(req.params.id);
  const lURL = urls[req.params.shortURL];

  // User is logged in and the user is the owner of the URL, update the URL
  urlDatabase[req.params.shortURL]["longURL"] = req.body.newLongURL;
  res.redirect(`/urls/${user.id}`);
})


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const accountsRoutes = require("./routes/accounts");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));

app.use("/accounts/", accountsRoutes(db));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
