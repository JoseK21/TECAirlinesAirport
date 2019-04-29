import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PassegerCheckComponent } from './passeger-check/passeger-check.component';
import { RegisterFlightComponent } from './register-flight/register-flight.component';
import { FlightClosureComponent } from './flight-closure/flight-closure.component';
import { AddUniversityComponent } from './add-university/add-university.component';

import { NgxQRCodeModule } from "ngx-qrcode2";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SearchFlightComponent,
    PromotionComponent,
    PassegerCheckComponent,
    RegisterFlightComponent,
    FlightClosureComponent,
    AddUniversityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxQRCodeModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
