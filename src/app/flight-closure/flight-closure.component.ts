import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-flight-closure',
  templateUrl: './flight-closure.component.html',
  styleUrls: ['./flight-closure.component.css']
})
export class FlightClosureComponent implements OnInit {

  state: string = ""
  message: string = "";
  openB: number = 0;
  msjAPI: string = "";

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;
  fligth_ids = [];
  loadF_ids: boolean = false;
  constructor(private service: ServiceService) { }

  ngOnInit() { }

  /**
   * setStateMessage
   */
  public setStateMessage() {
    this.openB = 0;
  }

  /**
   * sendID
   */
  public sendID(id: string) {
    if (id.toString() == "") {
      this.editAlert("Warning! ", "Flight Id empty", "warning");
      this.openB = 1;
    }
    else {
      this.service.closeID(id).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); 
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
          this.getList_idFlight();
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
      this.openB=1;
    }
  }


  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string) {
    this.msj = msg;
    this.text = text;
    this.type = type;
  }

  /**
   * getList_idFlight
   */
  public getList_idFlight() {
    this.service.getListFlights_id().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        this.fligth_ids = jsonWEBAPI.flights;
      } else if (jsonWEBAPI.http_result == 0) {
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }
}
