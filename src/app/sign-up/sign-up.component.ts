import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  n: number = 0;
  isStudent: boolean = false;
  fullName: string = "";
  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  public checkStudent() {
    if (this.n == 0) {
      this.n = 1;
      this.isStudent = true;
    } else {
      this.n = 0;
      this.isStudent = false;
    }
  }

  /**
   * signUP
   */
  public signUP(firtsName: string, lastName: string, universityName: string, carnet: number, email: string, phone: string, userName: string, password: string) {
    this.fullName = firtsName + " " + lastName;
    if (this.n) {
      console.log("Student : " + universityName + ">" + carnet + " ");
    }
    console.log(this.fullName + ">" + phone + ">" + userName + ">" + password);

    this.createCustomer(firtsName,lastName,universityName,carnet,email,phone,userName,password);
  }

  /**
   * createAdmin
   */
  public createCustomer(fn: string, ln: string, uvn: string, c: number, e: string, p: string, un: string, pw: string) {
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
      console.log(jsonTransfer);
    });
  }
}
