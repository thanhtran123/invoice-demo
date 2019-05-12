import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvoiceService } from "./services/invoice.service";

import {FilterPipe} from './pipes/filter.pipe'

import { AppComponent } from './app.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
