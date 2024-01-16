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
  const filtered = term && await search.getList(term);
  res.json(filtered || []);
});

app.get("/description/:videoId", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-max-age=60, stale-while-revalidate');
  const { videoId } = req.params;
  const video = await search.getDescription(videoId);
  res.json(video);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;