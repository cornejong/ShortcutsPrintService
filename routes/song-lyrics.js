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
        /* Clone the request body */
        let data = JSON.parse(JSON.stringify(req.body));
            
        try {
            /* Get the lyrics for the provided artist and title from azlyrics */
            data.lyrics = await scraper.getLyric(data.artist + ' - ' + data.title);
        } catch (error) {
            /* Shit hit the fan! or we could just not find it... probably that */
            /* This message will be spoken out at the end (when using shortcuts), so be creative */
            /* You could just change the server logging mesasage to something a bit more informative */
            let message = 'Could not find the lyrics to ' + data.artist + '\'s ' + data.title;
            console.log('✗ ' + message, error);
            res.send(message);
            return;
        }

        try {
            /* For how many time you'd like to het the lyrics */
            for (let counter = 1; counter <= data.times; counter++) {
                /* Give the printing a try */
                await print(printer, data);
            }
        } catch (error) {
            /* Shit hit the fan! The printer burned or lost connection mid-print.. we don't know.. */
            /* This message will be spoken out at the end (when using shortcuts), so be creative */
            /* You could just change the server logging mesasage to something a bit more informative */
            let message = 'An error occurred while printed the lyrics for ' + data.artist + '\'s ' + data.title;
            console.log('✗ ' + message, error);
            res.send(message);
            return;
        }

        /* All went well! */
        /* This message will be spoken out at the end (when using shortcuts), so be creative */
        /* You could just change the server logging mesasage to something a bit more informative */
        let message = 'Successfully printed the lyrics for ' + data.artist + '\'s ' + data.title;
        console.log('✓ ' + message);
        res.send(message);
    });

    /**
     * Supporing Functions
     */

    async function print(printer, data) {
        /* Print the logo */
        printer.alignCenter();
        /* Make the tezt super sized */
        printer.setTextQuadArea();
        printer.println(data.artist);
        printer.println(data.title);
        /* Reset the font size to it's default size */
        printer.setTextSize(0, 0);
        /* Draw some separation line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();  
        
        printer.alignLeft();
        /* For each of the linse of the lyrics */
        data.lyrics.forEach(function (line) {
            /* Print the line and remove all the html entities and strange accents that the printer doesn't understand */
            /* Additionally you could add other stuff here, it's up to you */
            printer.println(entities.decode(line).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        }); 
        /* And finaly let s cut the printer */
        printer.cut();
        /* Lets execute and return */
        return await printer.execute();
    }

}