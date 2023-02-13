const express = require('express');
const app = express();
const cors = require("cors");
const Gtts = require('gtts');

app.use(cors());

app.get('/hear', function (req, res) {
  const gtts = new Gtts(req.query.text, 'es');
  gtts.stream().pipe(res);
});

app.listen(3001, function () {
  console.log("server running")
});