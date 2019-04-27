import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register-flight',
  templateUrl: './register-flight.component.html',
  styleUrls: ['./register-flight.component.css']
})
export class RegisterFlightComponent implements OnInit {

  airport = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];
  heroes = ['Magneta', 'Tornado'];
  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";
  windowsSearch: boolean = true;
  showModal: number = 0;
  point: number = 0;
  msj: string = "";
  text: string = "";
  type: string = "";

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW: string;

  showMessage: boolean = false;

  typeFlight: boolean = false; // false : Round Class - true : One way
  class3: boolean = false; // false : Bussiness Class - true : Economy Class

  // Variables to need load with info of Data Base
  ap_name = [];
  airportSelected: string = "";
  airportLoadApi: boolean = false;
  airportLoadCorrect: number = 0;

  //Variables to send in Reservation
  s_flight_Id: string = "";
  s_type: string = "";
  s_is_first_class: boolean = false;
  s_people_flying: number = 0;
  s_username: string = "";
  dateMIN = "";

  fligth_ids = [];
  modelPlane = [];
  loadF_ids: boolean = false;
  loadP_model: boolean = false;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.dateNOW = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getPlaneModel();
  }

  /**
   * setDate
   */
  public setDate(dateMin: string) {
    this.dateMIN = dateMin;
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
   * getAirport
   */
  public getAirport() {
    if (!this.airportLoadApi) {
      // COLSULTA A LA BASE
      this.airportLoadApi = true;
      this.service.getAirports().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); 
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
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
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string, numAlert: number) {
    this.msj = msg;
    this.text = text;
    this.type = type;
  }

  /**
   * checkInputs
   */
  public checkInputs(FI: string, DD: string, PM: string, EP: string, FCP: string) {
    if (FI.trim() == "" || DD.trim() == "" || PM.trim() == "" || FCP.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
      this.showMessage = true;
    } 
    else if(Number(FCP)<0 || Number(EP)<0){
      this.editAlert("Warning! ", "Negative Price", "warning", 2);
      this.showMessage = true;
    }
    else {
      const json = {
        depart_ap: this.ptD,arrival_ap: this.ptA, flight_id: FI, depart_date: DD, plane_model: PM,
        normal_price: Number(EP), fc_price: Number(FCP)
      };
      this.service.registryFlight(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success", 2);
          this.showMessage = true;
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger", 2);
          this.showMessage = true;
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }


  /**
  * closeMessage
  */
  public closeMessage() {
    this.showMessage = false;
  }

  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input: string) {
    if (input.trim().length > 0) {
      this.ptD = input;
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
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }
  }

  /**
   * getAllIdFlight Get the list of id_flights
   */
  public getPlaneModel() {
  
    if (!this.loadP_model) {
      this.service.getPlaneModel().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); 
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
        if (jsonWEBAPI.http_result == 1) {
          this.modelPlane = jsonWEBAPI.airplanes;
          this.loadP_model = true;
        } else if (jsonWEBAPI.http_result == 0) {
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

}
