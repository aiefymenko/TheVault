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

  router.get("/", (req, res) => {

    const org = { name: req.session.org };
    const user = { name: req.session.username };

    const templateVars = { user: user, org: org };
    res.render("account_new", templateVars);

  });

  router.post("/", (req, res) => {

    const queryString = `
      SELECT id
      FROM categories
      WHERE name ILIKE $1
    `;

    const values = [req.body.category];

    db.query(queryString, values)
      .then(data => {
        //Category exists, will use the category id returned to insert data
        if (data.rows[0]) {

          const queryString1 = `
          INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES ($1, $2, $3, $4, $5, $6);
          `;
          const values1 = [data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password];

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
        // Category doesn't exist, will insert new record to category table
        else {

          const queryString2 = `
          INSERT INTO categories (name) VALUES ($1)
          RETURNING id
          `;
          const values2 = [req.body.category];

          db.query(queryString2, values2)
            .then(data => {
              const queryString3 = `
              INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES ($1, $2, $3, $4, $5, $6);
              `;
              const values3 = [data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password];

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
