const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const scraper = require("azlyrics-scraper");
const Entities = require('html-entities').Html5Entities
const entities = new Entities();


module.exports = function (app) {

    /**
     * Print Shopping list Endpoint
     */
    app.post('/print/song-lyrics', async function (req, res) {
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,
            interface: "tcp://192.168.178.157",
            characterSet: "SLOVENIA",
            removeSpecialCharacters: false,
            lineCharacter: "=",
            options: {
                timeout: 5000,
            },
        });

        let printerIsConnected = await printer.isPrinterConnected(); // Check if printer is connected, return bool of status
        if (printerIsConnected !== true) {
            res.send('Could not connect to printer!');
            return;
        }

        let data = JSON.parse(JSON.stringify(req.body));
        let times = data.times;
            
        try {
            data.lyrics = await scraper.getLyric(data.artist + ' - ' + data.title);
        } catch (error) {
            res.send('Could not find the lyrics to ' + data.artist + '\'s ' + data.title);
            return;
        }

        for (let index = 0; index < (times - 1); index++) {
            status = await print(printer, data);
            
            if (status !== true) {
                res.send('An error occurred while printing the lyrics!');
                return;
            }
        }

        if (status !== true) {
            res.send('An error occurred while printing the lyrics!');
        } else {
            res.send('Successfully printed the lyrics to ' + data.artist + '\'s ' + data.title);
        }
    });

    /**
     * Supporing Functions
     */

    async function print(printer, data) {
        /* Print the logo */
        printer.alignCenter();
        printer.setTextQuadArea();
        printer.println(data.artist);
        printer.println(data.title);

        printer.setTextSize(0, 0);
        /* Draw some line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();

        printer.alignLeft();

        data.lyrics.forEach(function (line) {
            printer.println(entities.decode(line).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        }); 

        printer.cut();

        try {
            await printer.execute();
            console.log("Print success.");
            return true;
        } catch (error) {
            console.error("Print error:", error);
            return error;
        }
    }

}