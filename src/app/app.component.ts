import { Component } from '@angular/core';
import { disableBindings } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TECAirlinesAirport';
  d:boolean = false;
  n:string="";

  /**
   * registry
   */
  public registry(state:boolean,name:string) {
    this.d=state;
    this.n=name;        
  }
}
