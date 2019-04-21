import { Component, OnInit } from '@angular/core';
import { and } from '@angular/router/src/utils/collection';
import { DatePipe, formatDate } from '@angular/common';
import { ServiceService } from '../service.service';
import { Alert } from 'selenium-webdriver';


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
  destino: string = "";

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW: string;

  typeFlight: boolean = false; // false : Round Class - true : One way
  class3: boolean = false; // false : Bussiness Class - true : Economy Class

  // Variables to need load with info of Data Base
  ap_name = ["Bogota", "San Jose", "Los Angeles"];  //Default
  list_flights = ['Flight1ERROR', 'Flight2ERROR'];  //Default
  airportSelected: string = "";
  airportLoadApi: boolean = false;
  airportLoadCorrect: number = 0;

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;
  msjAPI: string = "";

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
   * getAirport
   */
  public getAirport() {
    if (!this.airportLoadApi) {
      // COLSULTA A LA BASE
      this.airportLoadApi = true;
      console.log("Load Airport");
      this.service.getAirports().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        console.log(jsonWEBAPI);

        console.log(jsonWEBAPI.http_result);
        console.log(jsonWEBAPI.airports);
        if (jsonWEBAPI.http_result == 1) {
          this.airportLoadApi = false; // Lista cargada
          this.ap_name = jsonWEBAPI.airports;
        } else if (jsonWEBAPI.http_result == 0) {
          this.airportLoadApi = true; // Lista no cargada : no se retorno del web api
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
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
    this.windowsSearch = true;
    this.ptD = "Enter your point of departure ";
    this.ptA = "Enter your point of arrival";
    this.enableSF = false;
    this.typeFlight = false;
    this.class3 = false;
  }

  /**
   * sendData
   */
  public sendData() {
    // ELIMINAR DE AQUI ESTA MAS ABAJO va en la http_result = 1
    this.destino = this.ptD + " to " + this.ptA;
    // this.changeWindows();
    this.heroes = ['Magneta'];

    /*
    if (!this.typeFlight) { // False
      this.s_type = "Ida y Vuelta";
    } else {
      this.s_type = "Solo Ida";
    }
    this.s_is_first_class = !this.class3;

   this.s_people_flying = Number(adults) + Number(children) + Number(infacts);

   */
    // Consulta sobre los aeropuerto ingresados ... 

    // if ((adults + children + infacts) >= 0) {	//Parametros de entrada
    alert("Recibiendo datos del jsonTransfer");
    const json = { depart_ap: this.ptD, arrival_ap: this.ptA };  //{"depart_ap":San Jose, "arrival_ap": New York}
    alert("Generando json");
    this.service.getAirportByInputs(json).subscribe((jsonTransfer) => {
      alert("Despues del service");
      console.log(jsonTransfer);

      const userStr = JSON.stringify(jsonTransfer); // Object to String
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
      console.log("HTTP_result :" + jsonWEBAPI.http_result);

      if (jsonWEBAPI.http_result == 1) {
        alert("Exito de solicitud de lista de vuelos");
        this.list_flights = jsonWEBAPI.flights; //list_flights or flights

        //Recorer Esto

        //Por cada uno hacerle const jsonWEBAPI = JSON.parse(JSON.parse("""""userStr""""")); // String to Json
        // [{},{},{},{}]

        this.destino = this.ptD + " to " + this.ptA;


      } else if (jsonWEBAPI.http_result == 0) {
        this.msjAPI = jsonWEBAPI.msg;
        this.editAlert("Error! ", this.msjAPI, "warning", 1);


      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
     
    });
    alert("Termino request");
    //}
    /* else {
      this.editAlert("Error! ", "Without passengers", "danger", 1);
    }
    */
    
    console.log("<Fin del metodo>");
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string, numAlert: number) {
    if (numAlert == 1) {
      this.showMessageErrorLogin = true;
      this.showMessage = false;
    } else if (numAlert == 2) {
      this.showMessageErrorLogin = false;
      this.showMessage = true;
    }
    this.msj = msg;
    this.text = text;
    this.type = type;
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
  public changeWay(s: string) {
    if (s == 'R') {
      this.typeFlight = false;
      console.log("Round Trip");
    } else if (s == 'O') {
      this.typeFlight = true;
      console.log("One way");
    }
  }

  /**
  * changeClass
  */
  public changeClass(s: string) {
    if (s == 'B') {
      this.class3 = false;
      console.log("Business Class");
    } else if (s == 'E') {
      this.class3 = true;
      console.log("Economy Class ");
    }
  }
}
