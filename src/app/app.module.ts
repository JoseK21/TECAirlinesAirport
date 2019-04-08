import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PassegerCheckComponent } from './passeger-check/passeger-check.component';
import { RegisterFlightComponent } from './register-flight/register-flight.component';
import { OpeningOfFlightComponent } from './opening-of-flight/opening-of-flight.component';
import { FlightClosureComponent } from './flight-closure/flight-closure.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    WelcomeComponent,
    SignUpComponent,
    SearchFlightComponent,
    BookFlightComponent,
    PromotionComponent,
    PassegerCheckComponent,
    RegisterFlightComponent,
    OpeningOfFlightComponent,
    FlightClosureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
