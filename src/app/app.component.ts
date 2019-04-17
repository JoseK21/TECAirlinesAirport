import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TECAirlinesAirport';  
  n:string="";
  init:boolean=true;
  options:boolean = true; //Change to false
  message:string;

  receiveMessage($event) {
    this.message = $event
    if(this.message=="true"){
      this.options=true;
    }else if(this.message=="false"){
      this.options=false;
    }
  }

  /**
   * registry
   */
  public registry(state:boolean,name:string) {
    this.options=state;
    this.n=name;        
  }
}
