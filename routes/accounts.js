/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/:id", (req, res) => {

    const queryString = `
    SELECT accounts.*, categories.name as category, orgs.name as org
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1
    `;

    const values = [req.params.id];

    db.query(queryString, values)
      .then(data => {
        const accounts = data.rows;
        const org = { name: data.rows[0].org };
        const user = { id: req.params.id };

        const templateVars = { accounts: accounts, user: user, org: org };

        res.render("account", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new/:id", (req, res) => {

    const queryString = `
    SELECT accounts.*, categories.name as category, orgs.name as org
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1
    `;

    const values = [req.params.id];

    db.query(queryString, values)
      .then(data => {
        const org = { name: data.rows[0].org };
        const user = { id: req.params.id };

        const templateVars = { user: user, org: org };

        res.render("account_new", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/new/:id", (req, res) => {

    const queryString = `
    SELECT accounts.*, categories.name as category, orgs.name as org
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1
    `;

    const user = req.params.id
    const values = [user];

    db.query(queryString, values)
      .then(data => {
        const org = { name: data.rows[0].org };
        const user = { id: req.params.id };

        const templateVars = { user: user, org: org };

        res.render("accounts/user", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  // // To be removed: Create URL record
  // app.post("/urls/:id", (req, res) => {
  //   const user = users[req.params.id];

  //   // user doesn't exist
  //   if (!user) {
  //     return res.status(400).send("Invalid credentials");
  //   }

  //   // user exists and we generate a record in our url database
  //   let shortURL = generateRandomString();
  //   urlDatabase[shortURL] = {};
  //   urlDatabase[shortURL]["longURL"] = req.body.longURL;
  //   urlDatabase[shortURL]["userID"] = user.id;

  //   res.redirect(`/urls/${user.id}`);
  // })



  return router;
};
