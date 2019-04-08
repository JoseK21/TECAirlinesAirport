import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { shouldCallLifecycleInitHook } from '@angular/core/src/view';
import { delay } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registry: boolean = false;
  name: string = '';
  password: string = '';
  v1: true;
  v2: true;
  show_LI_SO:boolean=true; //Show Logn In : LO
  constructor() { }

  ngOnInit() {
  }

  message: string = "Hola Mundo!"

  // Este nombre :messageEvent es el nombre con que el otro componente sabe quien lo esta llamando
  @Output() messageEvent = new EventEmitter<string>();    

  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  sendCheck(check: string) {
    this.messageEvent.emit(check)
  }


  /**
   * setStatusRegistry
   */
  public setStatusRegistry(name: string, password: string) {
    console.log("NAME: " + name + "  PASSWORD: " + password);
    if ((name.length && password.length) > 0) {
      this.registry = true;
      this.name = name;
      this.password = password;
      console.log("NAME: " + name + "  PASSWORD: " + password);

      //AQUI HACER LA PETICION AL SERVICES Y RETORNAR AL APP-COMPONENT TRUE O FALSE (SI SE LOGEA CORRECTAMENTE)
      //this.sendMessage();
      this.sendCheck("true");
      this.signOut();
    }
  }

  /**
   * signOut
   */
  public signOut() {
    this.show_LI_SO=false; //Show Sign Out : SO
  }

  /**
   * SignIn
   */
  public SignIn() {
    this.show_LI_SO=true; //Show Sign Out : SO
    this.sendCheck("false");
  }
}
