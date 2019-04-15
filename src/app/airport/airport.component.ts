import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  country = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  airport = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];
  showAp: boolean = true;
  airportSelected: string = ""; 
  
  constructor() { }

  ngOnInit() {    
  }

  // Este nombre :messageEvent es el nombre con que el otro componente sabe quien lo esta llamando
  @Output() messageEvent2 = new EventEmitter<string>();    

  sendMessage() {
    this.messageEvent2.emit(this.airportSelected);
  }


  /**
   * updateAirport
   */
  public updateAirport(country: string) {
    console.log("Country: " + country);

  }

  /**
   * updateCountry
   */
  public updateCountry() {

  }

  /**
   * showAirport
   */
  public showAirport() {
    this.showAp = false;    
  }

  /**
   * setAirport
   */
  public setAirport(airport: string) {  
    this.airportSelected=airport;
    this.sendMessage();
  }
}
