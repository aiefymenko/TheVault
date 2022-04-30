/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {

  router.get("/new", (req, res) => {

    const org = { name: req.session.org };
    const user = { id: req.session.user_id };

    const templateVars = { user: user, org: org };
    res.render("account_new", templateVars);

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

  return router;
};
