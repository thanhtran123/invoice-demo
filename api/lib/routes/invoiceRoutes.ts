import {Request, Response, NextFunction} from "express";
import { InvoiceController } from "../controllers/crmController";

export class Routes {

    public invoiceController: InvoiceController = new InvoiceController()

    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        // Invoice
        app.route('/api/invoice')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }
        }, this.invoiceController.getInvoices)

        // POST endpoint
        .post(this.invoiceController.addNewInvoice);

        // Invoice detail
        app.route('/api/invoice/:invoiceId')
        // get specific invoice
        .get(this.invoiceController.getInvoiceWithID)
        .put(this.invoiceController.updateInvoice)
        .delete(this.invoiceController.deleteInvoice)

    }
}
