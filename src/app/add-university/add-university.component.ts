import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  
  constructor(private service: ServiceService) { }

  ngOnInit() {
  }
  /**
   * addUniversity
   */
  public addUniversity(nameUni:string) {
    if (nameUni.trim().length == 0 ) {
      this.editAlert("Warning! ", "Empty input", "warning");

    } else {
      const json = {  uni_name: nameUni    }
      this.service.addUniversity(json).subscribe((jsonTransfer) => {   
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
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
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessage = false;
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
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }

}
