import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DispensingListComponent } from './Dispensing/dispensing-list/dispensing-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { DataTablesModule } from 'angular-datatables';
import { DispensingAddComponent } from './Dispensing/dispensing-add/dispensing-add.component';

@NgModule({
  declarations: [AppComponent, LoginAdminComponent, DispensingListComponent, DispensingAddComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkTableModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
    }),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
