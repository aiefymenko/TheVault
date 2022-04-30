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

        req.session.user_id = req.params.id;
        req.session.org = data.rows[0].org;

        res.render("account", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
