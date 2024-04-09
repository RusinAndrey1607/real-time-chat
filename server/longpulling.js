const express = require("express");
const cors = require("cors");
const events = require("events");

const PORT = process.env.PORT || 8000;
const app = express();
const emmiter = new events.EventEmitter();
app.use(cors());
app.use(express.json() );

app.get("/get-messages", (req, res) => {
  emmiter.once("message", (messaqe) => {
    res.json(messaqe);
  });
});
app.post("/new-messages", (req, res) => {
  const message = req.body;
  emmiter.emit("message", message);
  res.status(200);
});
app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
