# ShortcutsPrintService

A simple print service for thermal POS printers.

In Action: https://www.reddit.com/r/shortcuts/comments/jzh9y3/built_an_automation_that_prints_my_ios_shopping/

### Getting Started
First of all clone this repo
```
$ git clone git@github.com:cornejong/ShortcutsPrintService.git
```

Install all the node modules
```
$ npm install
```

Get your printer IP address and update the addresses in the printer config (found in server.js)
For a full list of options check the [thermal printer](https://www.npmjs.com/package/node-thermal-printer) node package.
```JS
/* Define the printer config for the app */
/* Since you probably just use a single printer */
app.printer = {
  type: PrinterTypes.EPSON,
  interface: "tcp://{YOUR_PRINTER_IP}",
  characterSet: "SLOVENIA",
  removeSpecialCharacters: false,
  lineCharacter: "=",
  options: {
      timeout: 5000,
  },
};
```

Start the server:
```
$ node server
```

Update the server IP in you shortcut (links to my simple shortcuts are below) to the IP displayed when starting the server.
```
Listening at http://{YOUR_SERVER_IP}:3344
```

And that's it! You're good to go. Enjoy!

### Shortcuts
- [Print My Shopping List](https://www.icloud.com/shortcuts/d9cff80cc69744b185fa12f2256f362f)
- [Print The Lyrics To This Song](https://www.icloud.com/shortcuts/e4a20991dea44677bbd4e59e991946be) (Requires Shazam)
- [Print Multiple Lyrics Of This Song](https://www.icloud.com/shortcuts/52670a95db4848959841a2368d93c7b4) (Requires Shazam)

### Todo:
- Write gettings started guide
- implement all user suggested features
- add SSL to the server
- Do video tutorial(s)
- A lot more.. :)
