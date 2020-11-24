# ShortcutsPrintService
a simple print service for thermal POS printers.

### Getting Started
First of all clone this repo
```
$ git clone git@github.com:cornejong/ShortcutsPrintService.git
```

Install all the node modules
```
$ npm install
```

Get your printer IP address and update the addresses in the server routes: (Yes this will become some sort of global thing)
```
./routes/shopping-list.js [line 12]:  interface: "tcp://192.168.178.157",
./routes/song-lyrics.js   [line 16]:  interface: "tcp://192.168.178.157",
```

Start the server:
```
$ node server
```

Updat the server IP in you shortcut (links to my simple shortcuts are below) to the ip displayed when starting the server.
```
Listening at http://192.168.178.32:3344
```

And that's it! You're go to go. Enjoy!

### Shortcuts
- [Print My Shopping List](https://www.icloud.com/shortcuts/d9cff80cc69744b185fa12f2256f362f)
- [Print The Lyrics To This Song](https://www.icloud.com/shortcuts/e4a20991dea44677bbd4e59e991946be) (Requires Shazam)
- [Print Multiple Lyrics Of This Song](https://www.icloud.com/shortcuts/52670a95db4848959841a2368d93c7b4) (Requires Shazam)

### Todo:
- Add Global settings (eg: pinter IP)
- Write gettings started guide
- implement all user suggested features
- A lot more.. :)
