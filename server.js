
const express = require('express');
const app = express();

const ip = require("ip");
const port = 3344;

/* Auto parse json request body */
app.use(express.json()); 

var normalizedPath = require("path").join(__dirname, "routes");
/* Requireing all routes files */
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

app.listen(port, () => {
  console.log(`Listening at http://${ip.address()}:${port}`)
});

