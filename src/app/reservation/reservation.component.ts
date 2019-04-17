import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userCheck:boolean=false;
  userName:string="";

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  /**
   * logIn
   */
  public logIn(userName:string,password:string) {
    console.log("User name : "+userName+ "password"+password);

    // Consulta al services

    if(userName.trim() !="" && password.trim()!=""){
      this.userName=userName;
      this.logInCard(); // CASO DE PRUEBA - Eliminar luego
    }else{
      //Mensage de error...
    }
  }

  /**
   * logInCard
   */
  public logInCard() {    
    this.userCheck=!this.userCheck; // CASO DE PRUEBA
  }

  /**
   * pay
   */
  public pay(card:string,scode:string,exDate:string) {
    console.log(card.trim().length);
    console.log(scode.trim().length);
    console.log(exDate.trim().length);

    if(card.trim().length===0 || scode.trim().length===0 || exDate.trim().length===0){
      console.log("ERROR");
    }
    else{
      console.log("card :"+card+ " scode:"+scode+" exDate;"+exDate);
    }
  }

  
}
