import * as mongoose from 'mongoose';
import { InvoiceSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export class InvoiceController{

    public addNewInvoice (req: Request, res: Response) {
        let newInvoice = new Invoice(req.body);

        newInvoice.save((err, invoice) => {
            if(err){
                res.send(err);
            }
            res.json(invoice);
        });
    }

    public getInvoices (req: Request, res: Response) {
        Invoice.find({}, (err, invoices) => {
            if(err){
                res.send(err);
            }
            res.json(invoices);
        });
    }

    public getInvoiceWithID (req: Request, res: Response) {
        Invoice.findById(req.params.invoiceId, (err, invoice) => {
            if(err){
                res.send(err);
            }
            res.json(invoice);
        });
    }

    public updateInvoice (req: Request, res: Response) {
        Invoice.findOneAndUpdate({ _id: req.params.invoiceId }, req.body, { new: true }, (err, invoice) => {
            if(err){
                res.send(err);
            }
            res.json(invoice);
        });
    }

    public deleteInvoice (req: Request, res: Response) {
        Invoice.remove({ _id: req.params.invoiceId }, (err, invoice) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted invoice!'});
        });
    }
}
