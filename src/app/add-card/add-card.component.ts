import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  registry: boolean = false;
  name: string = '';
  password: string = '';
  show_LI_SO: boolean = true; //Show Logn In : LO   
  message: string = "Hola Mundo!"

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;

  msjAPI: string = "";

  constructor(private service: ServiceService) { }

  ngOnInit() {}

  

  /**
   * addCard
   */
  public addCard(userName:string, nCard:string,vcc:string,exp:string) {
    console.log(userName+"-"+nCard+"-"+vcc+"-"+exp);

    if ((userName.trim().length == 0 || nCard.trim().length == 0 || vcc.trim().length == 0 || exp.trim().length == 0 )) {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");

    } else {
      const json = {
        username: userName,
        card_number: nCard, 
        security_code: vcc,
        exp_date: exp
      }

      this.service.addCard(json).subscribe((jsonTransfer) => {
      

        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json

        console.log("Request : ");
        console.log(jsonTransfer);
        console.log(userStr);
        console.log("HTTP_result :" + jsonWEBAPI.http_result);

        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    
    
  }

  /**
  * editAlert
  */
 public editAlert(msg: string, text: string, type: string) {
  this.showMessage = true;
  this.msj = msg;
  this.text = text;
  this.type = type;
}

/**
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessage = false;
  }

  /**
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }

}
