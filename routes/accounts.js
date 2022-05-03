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

    const queryString = `
    SELECT accounts.*, categories.name as category, orgs.name as org, orgs.id as org_id, users.name as user_name
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1
    `;

    const values = [req.session.user_id];

    db.query(queryString, values)
      .then(data => {
        req.session.org = data.rows[0].org;
        req.session.org_id = data.rows[0].org_id;
        req.session.username = data.rows[0].user_name;

        const accounts = data.rows;
        const org = { name: data.rows[0].org, id: data.rows[0].org_id };
        const user = { name: data.rows[0].user_name };
        const templateVars = { accounts: accounts, user: user, org: org };

        res.render("account", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/new", (req, res) => {

    const org = { name: req.session.org };
    const user = { name: req.session.username };

    const templateVars = { user: user, org: org };
    res.render("account_new", templateVars);

  });

  router.post("/new", (req, res) => {

    const queryString = `
      SELECT id
      FROM categories
      WHERE name ILIKE $1
    `;

    const values = [req.body.category];

    db.query(queryString, values)
      .then(data => {
        if (data.rows[0]) {
          console.log("Category exists, will use the category id returned to insert data ");

          //To be removed: E.g. INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (1, 1, 'Facebook', 'www.facebook.com', 'lighthouse_lab@gmail.com', 'l1234567');
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
        else {
          console.log("category doesn't exist, will insert new record to category table");

          //To be removed: E.g. INSERT INTO categories (name) VALUES ('Social Media');
          const queryString2 = `
          INSERT INTO categories (name) VALUES ($1)
          RETURNING id
          `;
          const values2 = [req.body.category];
          console.log(values2);

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

  router.post("/delete/:id", (req, res) => {

    const queryString = `
    DELETE FROM accounts WHERE id = $1
    `;

    const values = [req.params.id];

    db.query(queryString, values)
      .then(data => {
        res.redirect('/accounts');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/edit/:id", (req, res) => {

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


  router.post("/edit/:id", (req, res) => {

    const queryString = `
      SELECT id
      FROM categories
      WHERE name ILIKE $1
    `;

    const values = [req.body.category];


    db.query(queryString, values)
      .then(data => {
        if (data.rows[0]) {
          console.log("Category exists, will use the category id returned to update data ");

          //To be removed: E.g. INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES (1, 1, 'Facebook', 'www.facebook.com', 'lighthouse_lab@gmail.com', 'l1234567');
          const queryString1 = `
          UPDATE accounts SET category_id = $1, org_id = $2, name = $3, url = $4, username= $5, password =$6 WHERE id = $7;
          `;
          const values1 = [data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password, req.params.id];

          console.log(values1);

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
        else {
          console.log("category doesn't exist, will insert new record to category table");

          //To be removed: E.g. INSERT INTO categories (name) VALUES ('Social Media');
          const queryString2 = `
          INSERT INTO categories (name) VALUES ($1)
          RETURNING id
          `;
          const values2 = [req.body.category];
          console.log(values2);

          db.query(queryString2, values2)
            .then(data => {
              const queryString3 = `
              UPDATE accounts SET category_id = $1, org_id = $2, name = $3, url = $4, username= $5, password =$6 WHERE id = $7;
              `;
              console.log("hihi " + data.rows[0].id, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password, req.params.id);

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
