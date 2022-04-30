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
    SELECT accounts.*, categories.name as category, orgs.name as org, orgs.id as org_id
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1
    `;

    const values = [req.session.user_id];

    db.query(queryString, values)
      .then(data => {
        const accounts = data.rows;
        const org = { name: data.rows[0].org, id: data.rows[0].org_id };
        const user = { id: req.params.id };

        const templateVars = { accounts: accounts, user: user, org: org };

        req.session.org = data.rows[0].org;
        req.session.org_id = data.rows[0].org_id;

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
    const user = { id: req.session.user_id };

    const templateVars = { user: user, org: org };
    res.render("account_new", templateVars);

  });

  router.post("/new", (req, res) => {

    const queryString = `
    INSERT INTO accounts (category_id, org_id, name, url, username, password) VALUES ($1, $2, $3, $4, $5, $6);
    `;

    //INSERT INTO accounts(category_id, org_id, name, url, username, password) VALUES(1, 1, 'Facebook', 'www.facebook.com', 'lighthouse_lab@gmail.com', 'l1234567');

    const values = [1, req.session.org_id, req.body.name, req.body.url, req.body.username, req.body.password];
    console.log(values);

    res.redirect('/account');

    // db.query(queryString, values)
    //   .then(data => {
    //     const accounts = data.rows;
    //     const org = { name: data.rows[0].org, id: data.rows[0].org_id };
    //     const user = { id: req.params.id };

    //     const templateVars = { accounts: accounts, user: user, org: org };

    //     req.session.user_id = req.params.id;
    //     req.session.org = data.rows[0].org;
    //     req.session.org_id = data.rows[0].org_id;

    //     res.render("account", templateVars);
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });



  });

  return router;
};
