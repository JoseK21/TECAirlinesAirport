import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-flight-closure',
  templateUrl: './flight-closure.component.html',
  styleUrls: ['./flight-closure.component.css']
})
export class FlightClosureComponent implements OnInit {

  state:string=""
  message:string="";
  openB:number=0;
  type:string="";

  constructor(private service: ServiceService) { }

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

  public closeID(id: string) {
    
    this.service.closeID(id).subscribe((jsonTransfer) => {
      console.log(jsonTransfer);
    });
  }

}
