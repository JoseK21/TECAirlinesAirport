import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  ap_name = ["a1","a2","a3","a4","a5","a6","a7","a8"];
  ap_short_name = [];
  showAp: boolean = true;
  airportSelected: string = "";   
  airportLoadApi: boolean = false;
  airportLoadCorrect : number ;
  
  constructor(private service: ServiceService) { 
    
    this.getAirport();
    
  }

  ngOnInit() {    
  }
  

  /**
   * getAirport
   */
  public getAirport() {
    if (!this.airportLoadApi) {
      // COLSULTA A LA BASE
      this.airportLoadApi = false;


      console.log("Load Airport");
      this.service.getAirports().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        console.log(JSON.parse(userStr));
        JSON.parse(userStr, (key, value) => {
          if (key === 'http_result') {
            this.airportLoadCorrect = value;
            this.airportLoadApi = true;
            if(value==0){
              this.airportLoadApi = true; // Lista no cargada : no se retorno del web api
            }else if(value==1){
              this.airportLoadApi = false; // Lista cargada
            }
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

}
