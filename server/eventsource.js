const express = require("express");
const cors = require("cors");
const events = require("events");

const PORT = process.env.PORT || 8000;
const app = express();
const emmiter = new events.EventEmitter();
app.use(cors());
app.use(express.json() );

app.get("/connect", (req, res) => {
  res.writeHead(200,{
    "Connection": "keep-alive",
    "Content-Type":"text/event-stream",
    "cache-control":"no-cache"
  })
  emmiter.on("message",(message) =>{
    res.write(`data: ${JSON.stringify(message)} \n\n`)
  })
});
app.post("/new-messages", (req, res) => {
  const message = req.body;
  emmiter.emit("message", message);
  res.status(200);
  res.end()
});
app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
