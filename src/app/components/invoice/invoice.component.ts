import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from "../../services/invoice.service";

declare var $:any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  providers: [InvoiceService],
  styleUrls : ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  invoices:any = [];
  searchTerm: '';
  editType = 1;
  invoiceModalTitle: 'New Invoice';
  invoiceForm: FormGroup;

  constructor(private _invoiceService : InvoiceService) {
  }

  public ngOnInit() {
    var self = this;
    self.invoiceForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      qty: new FormControl(''),
      date:new FormControl(''),
      customerName: new FormControl(''),
      dueDate: new FormControl(''),
      amount: new FormControl(''),
      totalPaid: new FormControl(''),
      openBalance: new FormControl(''),
      status: new FormControl('')
    });

    $('#invoiceForm').validate({
    });

    self.initData();
  }

  initData() {
    var self = this;
    self._invoiceService.getInvoices().then((res)=> {
      self.invoices = res;
    });
  }

  showInvoice(invoice) {
    var self = this;
    self.editType = invoice? 2 : 1;
    self.invoiceModalTitle = invoice? invoice.name : 'New Invoice';
    self.invoiceForm.reset({
      id: invoice? invoice.id : '',
      name: invoice? invoice.name: '',
      qty: invoice? invoice.qty: 0,
      date: invoice? self.formatDate(invoice.date) : '',
      customerName: invoice? invoice.customerName: '',
      dueDate: invoice? self.formatDate(invoice.dueDate) : '',
      amount: invoice? invoice.amount: 0,
      totalPaid: invoice? invoice.totalPaid: 0,
      openBalance: invoice? invoice.openBalance: 0,
      status: invoice? invoice.status: ''
    });
    $("#invoicePopup").modal('show');
  }

  formatDate(dateStr) {
    var date = new Date(dateStr);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  hideModal() {
    $("#invoicePopup").modal('hide');
  }

  btnSaveClick(e) {
    var self = this;
    if ($('#invoiceForm').valid()) {
      var data = self.invoiceForm.value;
      self._invoiceService.saveInvoice(data).then((res) => {
        if (!data.id) {
          data.id = res.id;
          self.invoices.push(data);
        } else {
          var index = -1;
          for (var i =0; i < self.invoices.length; i++) {
            if (self.invoices[i].id == data.id) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            self.invoices[index] = data;
          }
        }
        self.hideModal();
      });
    }
  }
  btnDeleteClick(e) {
    var self = this;
    var data = self.invoiceForm.value;
    self._invoiceService.deleteInvoice(data.id).then((res) => {
      var index = -1;
      for (var i =0; i < self.invoices.length; i++) {
        if (self.invoices[i].id == data.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        self.invoices.splice(index, 1);
      }
      self.hideModal();
    });
  }
}
