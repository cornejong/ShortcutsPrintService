const PrinterTypes = require("node-thermal-printer").types;
const express = require('express');
const app = express();

const ip = require("ip");
const port = 3344;

/* Auto parse json request body */
app.use(express.json()); 

/* Define the printer config for the app */
/* Since you probably just use a single printer */
app.printer = {
  type: PrinterTypes.EPSON,
  interface: "tcp://192.168.178.157",
  characterSet: "SLOVENIA",
  removeSpecialCharacters: false,
  lineCharacter: "=",
  options: {
      timeout: 5000,
  },
};

var normalizedPath = require("path").join(__dirname, "routes");
/* Requireing all routes files */
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

app.listen(port, () => {
  console.log(`Listening at http://${ip.address()}:${port}`)
});

