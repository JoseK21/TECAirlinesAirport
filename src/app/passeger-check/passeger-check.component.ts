import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-passeger-check',
  templateUrl: './passeger-check.component.html',
  styleUrls: ['./passeger-check.component.css']
})
export class PassegerCheckComponent implements OnInit {

  listCheck = ["q","p","r"];
  text: string;
  msj: string;
  type: string;
  showTable: boolean;

  codeQR = 'https://getbootstrap.com/docs/4.0/components/modal/';

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  /**
   * sendData
   */
  public goToCheck(userName:string) {
    const json = { username: userName};
    this.service.getListCheck(userName).subscribe((jsonTransfer) => {             //getListCheck(userName)
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        var array = JSON.parse("[" + jsonWEBAPI.listCheck + "]");                 //listCheck
        this.listCheck = array;
      } else if (jsonWEBAPI.http_result == 0) {
        this.listCheck = [];
        this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning");
        this.showTable = true;
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
    this.showTable = true;    // QUITAR
  }

  /**
   * checkFlight  */
  public checkFlight(check:any) {
    console.log(check);  
    
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string) {    
    this.msj = msg;
    this.text = text;
    this.type = type;
  }

}
