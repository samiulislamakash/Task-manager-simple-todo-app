import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './@pages/home/home.component';
import { TodosComponent } from './@pages/todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: WebReqIntreseptorService, multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
