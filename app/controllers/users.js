const express = require('express');

const app = express();
// const bcrypt = require('bcrypt');

const { passwordValidator } = require('../middlewares/users');

app.post('/usuario', passwordValidator, (req, res) => {
  try {
    const { body } = req;
    res.json({ ok: true, body });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

module.exports = app;
