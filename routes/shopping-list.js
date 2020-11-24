const ThermalPrinter = require("node-thermal-printer").printer;

module.exports = function (app) {

    /**
     * Print Shopping list Endpoint
     */
    app.post('/print/shopping-list', async function (req, res) {
        let printer = new ThermalPrinter(app.printer);

        if (!await printer.isPrinterConnected()) {
            res.send('Could not connect to printer!');
            return;
        }

        let data = JSON.parse(JSON.stringify(req.body));
        data.items = data.items.split("\n");

        if (await print(printer, data) !== true) {
            res.send('An error occurred while printing your shopping list!');
        } else {
            res.send('Successfully printed.');
        }
    });

    /**
     * Supporing Functions
     */

    async function print(printer, data) {
        /* Print the logo */
        printer.alignCenter();
        await printer.printImage("./assets/teunard.png");
        printer.newLine();
        printer.println("Teunard's Shopping List");

        printer.println("Printed on " + data.requested_at);
        printer.newLine();

        /* Draw some line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();

        printer.alignLeft();
        printer.setTextQuadArea();

        data.items.forEach(function (name) {
            printer.println("- " + name);
        });

        printer.setTextSize(0, 0);
        /* Draw some line */
        printer.newLine();
        printer.drawLine();
        printer.newLine();

        printer.alignCenter();
        printer.println("Total Items: " + data.items.length);

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