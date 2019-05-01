import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  isStudent: boolean = false;
  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;

  loadUni: boolean = false;
  list_univ = [];
  constructor(private service: ServiceService) { }


  ngOnInit() {
  }

  /**
  * editAlert
  */
  public editAlert(msg: string, text: string, type: string) {
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.showMessage = true;
  }

  /**
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessage = false;
  }

  public deleteCustomer(data: string) {
    if (data.trim() == "") {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
    } else {
      this.service.deleteCustomer(data).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    this.showMessage = true;
  }

  public deleteUniversity(data: string) {
    if (data.trim() == "") {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
    } else {
      this.service.deleteUniversity(data).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    this.showMessage = true;
  }
  public deleteFlight(data: string) {
    if (data.trim() == "") {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
    } else {
      this.service.deleteFlight(data).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    this.showMessage = true;
  }
  public deleteAirport(data: string) {
    if (data.trim() == "") {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
    } else {
      this.service.deleteAirport(data).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    this.showMessage = true;
  }
  public deletePlane(data: string) {
    if (data.trim() == "") {
      this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
    } else {
      this.service.deletePlane(data).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success");
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
        } else {
          alert("ERROR DEL JSON.... sign-up.componet");
        }
      });
    }
    this.showMessage = true;
  }

}
