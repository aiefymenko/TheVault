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
    const user = { id: req.session.user_id };
    const templateVars = {user: user, org: org };
    res.render("newpass", templateVars);

  });

  return router;
};

