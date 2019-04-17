import { Component, OnInit } from '@angular/core';
import { and } from '@angular/router/src/utils/collection';
import { DatePipe, formatDate } from '@angular/common';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css'],
  providers: [DatePipe]
})
export class SearchFlightComponent implements OnInit {
  airport = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];
  heroes = ['Magneta', 'Tornado'];
  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";
  windowsSearch: boolean = true;
  showModal: number = 0;
  point: number = 0;

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW: string;

  typeFlight: boolean = false; // false : Round Class - true : One way
  class3: boolean = false; // false : Bussiness Class - true : Economy Class

  airportSelected: string = "";
  airportLoadApi: boolean = false;
  airportLoadCorrect: boolean = false;

  // Variables to need load with info of Data Base
  ap_name = [];
  ap_short_name = [];

  //Variables to send in Reservation
  s_flight_Id: string = "";
  s_type: string = "";
  s_is_first_class: boolean = false;
  s_people_flying: number = 0;
  s_username: string = "";

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.dateNOW = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }


  receiveMessage($event) {
    if (this.point == 0) {
      this.ptD = $event;
    } else if (this.point == 1) {
      this.ptA = $event;
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }

  }

  /**
 * setAirport
 */
  public setAirport(airport: string) {
    this.airportSelected = airport;
    this.ptD = airport;
  }

  /**
   * changeWindows
   */
  public changeWindows() {
    this.windowsSearch = !this.windowsSearch;
    this.ptD = "Enter your point of departure ";
    this.ptA = "Enter your point of arrival";
    this.enableSF = false;
    this.typeFlight=false;
    this.class3=false;
  }

  /**
   * sendData
   */
  public sendData(date: string, adults: number, children: number, infacts: number) {
    if(!this.typeFlight){ // False
      this.s_type="Ida y Vuelta";
    }else{
      this.s_type="Solo Ida";
    }
    this.s_is_first_class=!this.class3;  

   this.s_people_flying= Number(adults)+Number(children)+Number(infacts);

    
    console.log("<Import datas>\n"+ " type: "+this.s_type+ " is_first_class: "+this.s_is_first_class+ " people_flying: "+this.s_people_flying);
     this.changeWindows();

  }

  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input: string) {
    if (input.trim().length > 0) {
      this.ptD = input;
      console.log(input);
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }


  }
  /**
   * setptA
   * Selecciona el punto de llegada 
   */
  public setptA(input: string) {
    if (input.trim().length > 0) {
      this.ptA = input;
      console.log(input);
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }
  }

  /**
   * getAirport
   */
  public getAirport() {
    if (!this.airportLoadApi) {
      // COLSULTA A LA BASE
      console.log("Load Airport");
      this.airportLoadApi = true; // QUITAR LUEGO QUE SE OBTIENE TODO BIEN DE LA BASE
      this.service.getAirports().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        console.log(JSON.parse(userStr));
        JSON.parse(userStr, (key, value) => {
          if (key === 'http_result') {
            this.airportLoadCorrect = value;
            this.airportLoadApi = true;
            console.log(value);
          }
          if (this.airportLoadCorrect) {
            if (key === 'ap_name') {
              console.log('ap_name :' + value);
              this.ap_name = value;
            }
            if (key === 'ap_short_name') {
              console.log('ap_short_name :' + value);
              this.ap_short_name = value;
            }
          }
        });
      });

    }
  }

  /**
   * numModal
   * 0: pointDeparture
   * 1: pointArrival
   * charModal
   * 
   */
  public changeModal(numModal: number, charModal: number) { //CharModal: Input seleccionado
    if (numModal == 0) {
      this.point = charModal;
    }
    this.showModal = numModal;
    //     this.getAirport();  // Load the airport from the Data Base
  }

  /**
   * changeCheck
   */
  public changeCheck(row: number, col: number) {
    console.log("<<<<<<<<<<<<<<<<<<<<<Eliminar metodo changeCheck>>>>>>>>>>>>>>>>>>>>>>>>");
    
  }


  /**
   * changeWay
   */
  public changeWay(s:string) {
    if(s=='R'){
      this.typeFlight = false;
      console.log("Round Trip");
    }else if(s=='O'){
      this.typeFlight = true;
      console.log("One way");
    }
  }

   /**
   * changeClass
   */
  public changeClass(s:string) {
    if(s=='B'){
      this.class3 = false;
      console.log("Business Class");
    }else if(s=='E'){
      this.class3 = true;
      console.log("Economy Class ");
    }
  }
}
