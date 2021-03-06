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

  // Show account information based on passed in id
  router.get("/:id", (req, res) => {

    // Query all account data for specific account
    const queryString = `
    SELECT accounts.*, categories.id as category_id, categories.name as category_name
    FROM accounts JOIN categories ON accounts.category_id = categories.id
    WHERE accounts.id = $1
    `;

    const values = [req.params.id];

    db.query(queryString, values)
      .then(data => {

        const account = data.rows[0];
        const org = { name: req.session.org };
        const user = { name: req.session.username };
        const templateVars = { account: account, user: user, org: org };

        res.render("account_edit", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  // Update account information for an account
  router.post("/:id", (req, res) => {

    const queryString = `
      SELECT id
      FROM categories
      WHERE name ILIKE $1
    `;

    const values = [req.body.category];


    db.query(queryString, values)
      .then(data => {
        //Category exists, will use the category id returned to update data
        if (data.rows[0]) {

          const queryString1 = `
          UPDATE accounts SET category_id = $1, org_id = $2, name = $3, url = $4, username= $5, password =$6 WHERE id = $7;
          `;
          const values1 = [data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password, req.params.id];

          db.query(queryString1, values1)
            .then(data => {
              res.redirect('/accounts');
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });

        }
        //category doesn't exist, will insert new record to category table
        else {
          const queryString2 = `
          INSERT INTO categories (name) VALUES ($1)
          RETURNING id
          `;
          const values2 = [req.body.category];

          db.query(queryString2, values2)
            .then(data => {
              const queryString3 = `
              UPDATE accounts SET category_id = $1, org_id = $2, name = $3, url = $4, username= $5, password =$6 WHERE id = $7;
              `;

              const values3 = [data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password, req.params.id];

              db.query(queryString3, values3)
                .then(data => {
                  res.redirect('/accounts');
                })
                .catch(err => {
                  res
                    .status(500)
                    .json({ error: err.message });
                });

            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
