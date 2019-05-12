import {Request, Response, NextFunction} from "express";
import { InvoiceController } from "../controllers/invoiceController";

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
        .get(this.invoiceController.getInvoices)

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
