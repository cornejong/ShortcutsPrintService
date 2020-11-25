# ShortcutsPrintService

A simple print service for thermal POS printers.
Works with most of the POS printers. (thanks to the ```node-thermal-printer``` folks)

If you wanna know more about printer support? Please checkout the [thermal printer](https://www.npmjs.com/package/node-thermal-printer) node package i've used.

### Recomendation: 
Lets be kind to our planet, get yourself some eco friendly paper for your printer: [Read more](https://www.starmicronics.com/blog/eco-friendly-receipts/)

In Action: https://www.reddit.com/r/shortcuts/comments/jzh9y3/built_an_automation_that_prints_my_ios_shopping/

## Getting Started
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

Check the shopping list "Get Contents From URL" actions JSON body for the heading text on the shopping list. 
I'll add a more generic list print endpoint in the future to let you print any list easily.

And that's it! You're good to go. Enjoy!

### Shortcuts
- [Print My Shopping List](https://www.icloud.com/shortcuts/9390d1f857164741b00721cdd9ae14fb) ([In Action](https://www.reddit.com/r/shortcuts/comments/jzh9y3/built_an_automation_that_prints_my_ios_shopping/))
- [Print The Lyrics To This Song](https://www.icloud.com/shortcuts/e4a20991dea44677bbd4e59e991946be) (Requires Shazam)
- [Print Multiple Lyrics Of This Song](https://www.icloud.com/shortcuts/52670a95db4848959841a2368d93c7b4) (Requires Shazam)

### Todo:
- explore option to add upnp "normal" printer support
- fix the word break bug for longer sentences
- Write gettings started guide
- implement all user suggested features
- add SSL to the server
- Do video tutorial(s)
- A lot more.. :)
