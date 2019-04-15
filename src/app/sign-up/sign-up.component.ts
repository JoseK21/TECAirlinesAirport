import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  n: number = 0;
  fullName: string = "";
  constructor() { }

  ngOnInit() {
  }

  public checkStudent() {
    if (this.n == 0) {
      this.n = 1;
    } else {
      this.n = 0;
    }
  }

  /**
   * signUP
   */
  public signUP(firtsName: string, lastName: string, universityName: string, carnet: string,email:string, phone: string, userName: string, password: string) {
    this.fullName = firtsName + " " + lastName;
    if (this.n) {
      console.log("Student : "+universityName + ">" + carnet + " ");
    }
    console.log(this.fullName + ">" + phone + ">" + userName + ">" + password);


  }

}
