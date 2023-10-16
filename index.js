const express = require('express');
const cors = require('cors');
const search = require('./search.js');

const app = express();

const port = 3000;

app.use(cors())

app.get("/", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=14400, stale-while-revalidate');
  res.json('API working...');
});

app.get("/search", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=60, stale-while-revalidate');
  const term = req.query['term'];
  const vids = term && await search.getList(term);
  const filtered = vids && vids.filter(v => v.channelTitle);
  res.json(filtered || []);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;