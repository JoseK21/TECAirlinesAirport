import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  country1: string = "CountryExameple: Panama";
  country2: string = "CountryExameple: USA";

  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];
  airportDep = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  airportArr = ['ast', 'ber', 'cax', 'det', 'ext', 'fas', 'gil', 'hou', 'ila', 'jor'];


  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";

  windowsSearch: boolean = true;
  showModal: number = 0;
  point: number = 0;
  minDate="";
  maxDate="";
  showDateReturn:boolean=true;

  constructor() { }

  ngOnInit() {
  }

  /**
   * changeWindows
   */
  public changeWindows() {
    this.windowsSearch = !this.windowsSearch;
  }

  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input: string) {
    this.ptD = input;

  }
  /**
   * setptA
   * Selecciona el punto de llegada 
   */
  public setptA(input: string) {
    this.ptA = input;
  }

  /**
   * setMinDate
   */
  public setMinDate(mindate:string) {
    this.minDate=mindate;
    console.log(mindate);    
  }
  /**
   * setMaxDate
   */
  public setMaxDate(maxdate:string) {
    this.maxDate=maxdate;
    console.log(maxdate);
  }

  /**
   * removeDateReturn
   */
  public removeDateReturn(check:boolean) {
    this.showDateReturn=check;
  }


  /**
   * numModal
   * 0: pointDeparture
   * 1: pointArrival
   * charModal
   * 
   */
  public changeModal(numModal: number, charModal: number) {
    if(numModal==0){
      this.point = charModal;
    }
    this.showModal = numModal;    
  }
}
