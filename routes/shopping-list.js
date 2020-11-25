const ThermalPrinter = require("node-thermal-printer").printer;

module.exports = function (app) {

    /**
     * Print Shopping list Endpoint
     */
    app.post('/print/shopping-list', async function (req, res) {
        /* Create a new printer */
        let printer = new ThermalPrinter(app.printer);
        /* check if we are connected */
        if (!await printer.isPrinterConnected()) {
            res.send('Could not connect to printer!');
            return;
        }
        /* Clone the request body */
        let data = JSON.parse(JSON.stringify(req.body));
        /* Lets turn the long string of items separated by new lines into an array */
        /* You could keep the line breaks, works just fine (make sure to update the function below tho) */
        /* But this way you're able to add some additional line based formatting and add the total items to the end  */
        data.items = data.items.split("\n");

        try {
            /* Give the printing a try */
            await print(printer, data);
        } catch (error) {
            /* Shit hit the fan! The printer burned or lost connection mid-print.. we don't know.. */
            /* This message will be spoken out at the end (when using shortcuts), so be creative */
            /* You could just change the server logging mesasage to something a bit more informative */
            let message = 'An error occurred while printing your shopping list!';
            console.log('✗ ' + message, error);
            res.send(message);
            return;
        }

        /* All went well! */
        /* This message will be spoken out at the end (when using shortcuts), so be creative */
        /* You could just change the server logging mesasage to something a bit more informative */
        let message = 'Shopping List Successfully printed!';
        console.log('✓ ' + message);
        res.send(message);
    });

    /**
     * Supporing Functions
     */

    async function print(printer, data) {
        /* Print the logo */
        printer.alignCenter();
        /* Be creative, add a logo */
        await printer.printImage("./assets/home-icon-small.png");
        printer.newLine();
        /* Print the user provided heading */
        printer.println(data.heading);
        /* Add a timestamp */
        printer.println("Printed on " + data.requested_at);
        printer.newLine();

        /* Draw some line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();

        printer.alignLeft();
        /* Make the tezt super sized */
        printer.setTextQuadArea();
        /* For each of our shopping list items we're gonna do what? */
        data.items.forEach(function (name) {
            /* Print the line and remove all the strange accents that the printer doesn't understand */
            /* Also, i'd like to prepend them with '-' just for visual purposes */
            printer.println("- " + name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        });
        /* Draw some separation line */
        printer.setTextSize(0, 0);
        /* Draw some line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();
        /* Let s print the total number of items at the bottom of our list */
        printer.alignCenter();
        printer.println("Total Items: " + data.items.length);
        /* And finaly let s cut the printer */
        printer.cut();
        /* Lets execute and return */
        return await printer.execute();
    }

}