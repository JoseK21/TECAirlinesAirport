import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registry:boolean = false;
  name:string = "";

  constructor() { }

  ngOnInit() {
  }

  /**
   * setStatusRegistry
   */
  public setStatusRegistry(r:boolean,n:string) {
    this.registry=r;   
    this.name=n;     

    console.log(r+"----"+n);
    
  }

}
