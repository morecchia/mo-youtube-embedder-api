import express from "express";
import cors from 'cors';
import { getList } from "./search.js";

const app = express();
const port = 3000;

app.use(cors())

app.get("/", async (req, res) => {
  const term = req.query['term'];
  const vids = term && await getList(term);
  res.json(vids || []);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
