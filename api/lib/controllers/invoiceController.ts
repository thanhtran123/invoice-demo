import { Request, Response } from 'express';

const sqlConfig = {
    user: 'sa',
    password: 'vStation123',
    server: 'localhost',
    database: 'InvoiceDemo',
    "port": '1433',
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    }
};
const sql = require("mssql");

export class InvoiceController{

    public getInvoices (req: Request, res: Response) {
      sql.connect(sqlConfig, function (err) {
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Invoice', function (err, recordset) {
            // send records as a response
            res.send(recordset);
        });
      });
    }

    public getInvoiceWithID (req: Request, res: Response) {
        sql.connect(sqlConfig, function (err) {
          var request = new sql.Request();
          request.query('select * from Invoice where id = ' + req.params.invoiceId, function (err, recordset) {

              if (err) console.log(err)
              // send records as a response
              res.send(recordset);
          });
        });
    }

    public addNewInvoice (req: Request, res: Response) {
        sql.connect(sqlConfig, function (err) {
          var data:any = req.body;
          var INSERT_SQL = "insert into Invoice(name, qty, date, customerName, dueDate, amount, totalPaid, openBalance, status) values ('" + data.name + "', " + data.qty + ", '" + data.date + "', '" + data.customerName + "', '" + data.dueDate + "', '" + data.amount + "', '" + data.totalPaid + "', '" + data.openBalance + "', '" + data.status + "'); SELECT SCOPE_IDENTITY() AS id;";
          console.log(INSERT_SQL);
          var request = new sql.Request();
          request.query(INSERT_SQL, function (err, recordset) {
              var data:any = {
                ok: true
              };
              if (err) {
                data.ok = false;
              } else {
                data.id = recordset;
              }
              res.send(data);
          });
        });
    }

    public updateInvoice (req: Request, res: Response) {
        sql.connect(sqlConfig, function (err) {
          if (err) console.log(err);
          var data:any = req.body;
          var UPDATE_SQL = "Update Invoice set name='" + data.name + "', qty=" + data.qty + ", date='" + data.date + "', customerName='" + data.customerName + "', dueDate='" + data.dueDate + "', amount=" + data.amount + ", totalPaid=" + data.totalPaid + ", openBalance=" + data.openBalance + ", status='" + data.status + "' where id=" + data.id;
          var request = new sql.Request();
          request.query(UPDATE_SQL, function (err, recordset) {
              var data:any = {
                ok: true
              };
              if (data) {
                data.ok = false;
              }
              res.send(data);
          });
        });
    }

    public deleteInvoice (req: Request, res: Response) {
        console.log(req.params.invoiceId);
        sql.connect(sqlConfig, function (err) {
          var DELETE_SQL = "Delete Invoice where id=" + req.params.invoiceId;
          var request = new sql.Request();
          request.query(DELETE_SQL, function (err, recordset) {
              var data:any = {
                ok: true
              };
              if (data) {
                data.ok = false;
              }
              res.send(data);
          });
        });
    }
}
