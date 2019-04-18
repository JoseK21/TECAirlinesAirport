import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  ap_name = ["a1000","a2","a3","a4","a5","a6","a7","a8"];
  airportSelected: string = "";   
  airportLoadApi: boolean = false;
  
  constructor(private service: ServiceService) {         
  }

  ngOnInit() {   
    this.getAirport() ;   
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
        const jsonWEBAPI = JSON.parse(userStr); // String to Json
        console.log(jsonWEBAPI.http_result);
        console.log(jsonWEBAPI.airport);
        if (jsonWEBAPI.http_result == 1) {
          this.airportLoadApi = false; // Lista cargada
          this.ap_name = jsonWEBAPI.airport;
        } else if (jsonWEBAPI.http_result == 0) {
          this.airportLoadApi = true; // Lista no cargada : no se retorno del web api
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }
}
