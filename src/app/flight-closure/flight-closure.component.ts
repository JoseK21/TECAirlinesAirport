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

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  /**
   * setStateMessage
   */
  public setStateMessage() {
    this.openB = 0;
  }

  /**
   * sendID
   */
  public sendID(id: number) {
    console.log("ID : " + id);
    if (id.toString() == "") {
      console.log("VAcio");
      this.editAlert("Warning! ", "Flight Id empty", "warning");
      this.openB=1;
      
    }
    else {
      this.service.closeID(id).subscribe((jsonTransfer) => {
        console.log("Dato a usar para hacer compraciones : " + jsonTransfer);
        const userStr = JSON.stringify(jsonTransfer);

        JSON.parse(JSON.parse(userStr), (key, value) => {

          if (key === 'msg') {
            this.msjAPI = value;
          }

          if (key === 'http_result') {
            console.log(value);
            if (value == 1) {//todo bien
              this.editAlert("Success! ", this.msjAPI, "success");
            } else {
              this.editAlert("Error! ", this.msjAPI, "danger");
            }
            this.openB=1;
          }
        });
      });
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

}
