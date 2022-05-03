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

  router.post("/:id", (req, res) => {

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

  return router;
};
