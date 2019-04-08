import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  n:number=0;
  constructor() { }

  ngOnInit() {
  }

  public checkStudent() {
    if(this.n == 0){
      this.n=1;
    }else{
      this.n=0;
    }
  }

}
