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
  heroes = ['Magneta', 'Tornado'];
  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";
  windowsSearch: boolean = true;
  showModal: number = 0;
  point: number = 0;

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW:string;
  
  typeFlight:boolean=false; // false : Round Class - true : One way
  class3:boolean=false; // false : Bussiness Class - true : Economy Class
  
  constructor(private service: ServiceService) {         
   }

  ngOnInit() {   
    this.dateNOW= formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }


  receiveMessage($event) {
    if (this.point == 0) {
      this.ptD = $event;
    } else if (this.point == 1) {
      this.ptA = $event;
    }
    if(this.ptD!= "Enter your point of departure " && this.ptA!="Enter your point of arrival"){
      this.enableSF=true;
    }
    
  }

  /**
   * changeWindows
   */
  public changeWindows() {
    this.windowsSearch = !this.windowsSearch;
    this.ptD="Enter your point of departure ";
    this.ptA="Enter your point of arrival";
    this.enableSF=false;
   }
  /**
   * sendData
   */
  public sendData(date:string,adults:string,children:string,infacts:string) {
    console.log("Departure : "+this.ptD+" Arrival: "+this.ptA);
    
    console.log("Date : "+date+" Adults: "+adults+" Clildren: "+children+" Infacts: "+infacts);    
    this.changeWindows();
    
  }

  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input: string) {
    this.ptD = input;
    console.log(input);

  }
  /**
   * setptA
   * Selecciona el punto de llegada 
   */
  public setptA(input: string) {
    this.ptA = input;
    console.log(input);
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
  public changeCheck(row:number,col:number) {
    if(row==1){
      if(col==1){
        this.typeFlight=false;
      }else{
        this.typeFlight=true;
      }
    }else{
      if(col==1){
        this.class3=false;
      }else{
        this.class3=true;
      }

    }
  }
}
