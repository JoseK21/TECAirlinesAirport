import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isStudent: boolean = false;
  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  constructor(private service: ServiceService) { }

  ngOnInit() {
  }
  /**
   * checkStudent Cambio de condición : estudiante o no
   */
  public checkStudent() {
    this.isStudent = !this.isStudent ;   
  }
  /**
   * createCustomer Creación de cuenta de Admin
   */
  public createCustomer(fn: string, ln: string, uvn: string, c: number, e: string, p: string, un: string, pw: string) {

    console.log("Inside");

    if(this.isStudent){
      if ((fn.trim().length == 0 || ln.trim().length == 0 || uvn.trim().length == 0 || c<= 0 || e.trim().length == 0 || p.trim().length == 0 || un.trim().length == 0 || pw.trim().length == 0)) {
        this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
  
      } else {
        this.editAlert("Success! ", "Account created", "success");
        const json = {
          full_name: fn + " " + ln,
          phone_numbr: p,
          email: e,
          is_student: this.isStudent,
          college_name: uvn,
          student_id: c,
          username: un,
          password: pw,
        };
        console.log(":> " + json);
        this.service.createCustomer(json).subscribe((jsonTransfer) => {
          
          if (jsonTransfer == 'error') {
            this.editAlert("Error! ", "Username used", "danger");
          } else {
            this.editAlert("Success! ", "Account created", "success");
          }
          console.log(jsonTransfer);
        });
      }
    }else{
      if ((fn.trim().length == 0 || ln.trim().length == 0 || e.trim().length == 0 || p.trim().length == 0 || un.trim().length == 0 || pw.trim().length == 0)) {
        this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
  
      } else {
        this.editAlert("Success! ", "Account created", "success");
        const json = {
          full_name: fn + " " + ln,
          phone_numbr: p,
          email: e,
          is_student: this.isStudent,
          college_name: uvn,
          student_id: c,
          username: un,
          password: pw,
        };
        console.log(":> " + json);
        this.service.createCustomer(json).subscribe((jsonTransfer) => {
  
          if (jsonTransfer == 'error') {
            this.editAlert("Error! ", "Username used", "danger");
          } else {
            this.editAlert("Success! ", "Account created", "success");
          }
          console.log(jsonTransfer);
        });
      }
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
}
