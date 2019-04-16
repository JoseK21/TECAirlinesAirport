import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register-flight',
  templateUrl: './register-flight.component.html',
  styleUrls: ['./register-flight.component.css']
})
export class RegisterFlightComponent implements OnInit {

  showModal: number = 0;
  point: number = 0;
  dateNOW:string;
  dateMIN:string;
  constructor() { }

  ngOnInit() {
    this.dateNOW= formatDate(new Date(), 'yyyy-MM-dd', 'en');

  }

  /**
   * setDate
   */
  public setDate(dateMin:string) {
    this.dateMIN=dateMin;    
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

}
