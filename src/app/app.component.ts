import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TECAirlinesAirport'; 
  options:boolean = true; // Show options

  /**
   * Method to receive a variable from Home.Component
   * @param $event Display options' data
   */
  receiveMessage($event) {
    if($event=="true"){
      this.options=true;
    }else if($event=="false"){
      this.options=false;
    }
  }
}
