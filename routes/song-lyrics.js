const ThermalPrinter = require("node-thermal-printer").printer;
const scraper = require("azlyrics-scraper");
const Entities = require('html-entities').Html5Entities
const entities = new Entities();


module.exports = function (app) {

    /**
     * Print Shopping list Endpoint
     */
    app.post('/print/song-lyrics', async function (req, res) {
        /* Setup the printer */
        let printer = new ThermalPrinter(app.printer);

        /* Lets check if we're connected */
        if (!await printer.isPrinterConnected()) {
            res.send('Could not connect to printer!');
            return;
        }

        let data = JSON.parse(JSON.stringify(req.body));
            
        try {
            data.lyrics = await scraper.getLyric(data.artist + ' - ' + data.title);
        } catch (error) {
            res.send('Could not find the lyrics to ' + data.artist + '\'s ' + data.title);
            return;
        }

        let status = true;
        for (let index = 1; index <= data.times; index++) {
            status = await print(printer, data);
            
            if (status !== true) {
                res.send('An error occurred while printing the lyrics!');
                return;
            }
        }

        if (!status) {
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