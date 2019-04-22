import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PassegerCheckComponent } from './passeger-check/passeger-check.component';
import { RegisterFlightComponent } from './register-flight/register-flight.component';
import { FlightClosureComponent } from './flight-closure/flight-closure.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddUniversityComponent } from './add-university/add-university.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    SignUpComponent,
    SearchFlightComponent,
    PromotionComponent,
    PassegerCheckComponent,
    RegisterFlightComponent,
    FlightClosureComponent,
    ReservationComponent,
    AddCardComponent,
    AddUniversityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
