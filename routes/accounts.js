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
        const keyword = { keyword: '' };
        const hidden = { visible: 'visibility: hidden' };
        const templateVars = { accounts: accounts, user: user, org: org, keyword: keyword, visible: hidden };


        res.render("account", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/search", (req, res) => {

    const queryString = `
    SELECT accounts.*, categories.name as category, orgs.name as org, orgs.id as org_id, users.name as user_name
    FROM users JOIN orgs ON users.org_id = orgs.id JOIN accounts ON orgs.id = accounts.org_id JOIN categories ON categories.id = accounts.category_id
    WHERE users.id = $1 AND (accounts.name ILIKE $2 OR accounts.url ILIKE $2 OR accounts.username ILIKE $2 OR accounts.password ILIKE $2 OR categories.name ILIKE $2)
    `;
    const text = '%' + req.query.text + '%';

    const values = [req.session.user_id, text];

    db.query(queryString, values)
      .then(data => {
        if (data.rows[0]) {
          req.session.org = data.rows[0].org;
          req.session.org_id = data.rows[0].org_id;
          req.session.username = data.rows[0].user_name;

          const accounts = data.rows;
          const org = { name: data.rows[0].org, id: data.rows[0].org_id };
          const user = { name: data.rows[0].user_name };
          const keyword = { keyword: req.query.text };
          const visible = { visible: 'visibility: visible' };

          const templateVars = { accounts: accounts, user: user, org: org, keyword: keyword, visible: visible };

          res.render("account", templateVars);
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
