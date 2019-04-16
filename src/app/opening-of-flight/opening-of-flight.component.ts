import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-of-flight',
  templateUrl: './opening-of-flight.component.html',
  styleUrls: ['./opening-of-flight.component.css']
})
export class OpeningOfFlightComponent implements OnInit {

  state:string=""
  message:string="";
  openB:number=0;
  type:string="";

  constructor() { }

  ngOnInit() {
  }

  /**
   * setStateMessage
   */
  public setStateMessage() {
    this.openB=0;
  }


  /**
   * sendID
   */
  public sendID(id:number) {
    console.log("ID : "+id);   
    // Consuta    
    if(id==1){     
      this.openB=1;
      this.state="Success! ";
      this.message="Flight "+id+" successfully opening";
      this.type="success";
    }else if(id==2){
      this.openB=1;
      this.state="Wrong! ";
      this.message="The opening of this flight was not made (check the ID)";
      this.type="warning";
    }else{
      this.openB=0;
    }
  }

}
