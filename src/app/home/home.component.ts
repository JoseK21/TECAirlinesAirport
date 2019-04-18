import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registry: boolean = false;
  name: string = '';
  password: string = '';
  show_LI_SO: boolean = true; //Show Logn In : LO   
  message: string = "Hola Mundo!"

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;

  msjAPI: string = "";

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  // Este nombre :messageEvent es el nombre con que el otro componente sabe quien lo esta llamando
  /* Variables and Methods to send data to another componenet  */

  @Output() messageEvent = new EventEmitter<string>();
  /**
   * sendMessage Tranfers data bewteen component
   */
  sendMessage() {
    this.messageEvent.emit(this.message)
  }
  /**
   * 
   * @param check Display Name University and ID Student : Carnet
   */
  sendCheck(check: string) {
    this.messageEvent.emit(check)
  }

  /* WEB API */

  /**
   * logInAdmin Login of an admin
   * @param un UserName
   * @param pw Password
   */
  public logInAdmin(un: string, pw: string) {
    if (un.trim().length > 0 && pw.trim().length > 0) {
      const json = { password: pw, username: un, };
      this.service.logIn(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);

        JSON.parse(JSON.parse(userStr), (key, value) => {

          if (key === 'msg') {
            this.msjAPI = value;
          }

          if (key === 'http_result') {
            console.log(value);
            if (value == 1) {//todo bien
              this.registry = true;
              this.name = un;
              this.sendCheck("true");
              this.signOut();
            } else {
              this.editAlert("Error! ", this.msjAPI, "danger", 1);
            }
          }
        });
      });
    } else {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    }
  }

  /**
   * registryAdmin Create account a Admin
   */
  public registryAdmin(fn: string, pn: string, em: string, un: string, pw: string, ro: string) {
    if (fn.trim() == "" || pn.trim() == "" || em.trim() == "" || un.trim() == "" || pw.trim() == "" || ro.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else {
      const json = { full_name: fn, phone_numbr: pn, email: em, username: un, password: pw, role: ro, };
      this.service.createAdmin(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        JSON.parse(JSON.parse(userStr), (key, value) => {

          if (key === 'msg') {
            this.msjAPI = value;
          }

          if (key === 'http_result') {
            console.log(value);
            if (value == 1) {//todo bien
              this.editAlert("Success! ", this.msjAPI, "success", 2);
            } else {
              this.editAlert("Error! ", this.msjAPI, "danger", 2);
            }
          }
        });
      });
    }
    this.showMessage = true;
  }

  /* GRAPHICS METHODS */

  /**
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }

  /**
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessageErrorLogin = false;
  }

  /**
   * signOut
   */
  public signOut() {
    this.show_LI_SO = false; //Show Sign Out : SO
  }

  /**
   * SignIn
   */
  public SignIn() {
    this.show_LI_SO = true; //Show Sign Out : SO
    this.sendCheck("false");
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string, numAlert: number) {
    if (numAlert == 1) {
      this.showMessageErrorLogin = true;
      this.showMessage = false;
    } else if (numAlert == 2) {
      this.showMessageErrorLogin = false;
      this.showMessage = true;
    }
    this.msj = msg;
    this.text = text;
    this.type = type;
  }

  /**
   * JSON
   */

  /**
   * testJSON
   */
  public testJSON() {
    const user = {
      http_result: 0,
      msg: 'Error',
    };


    const userStr = JSON.stringify(user);

    console.log(JSON.parse(userStr));

    JSON.parse(userStr, (key, value) => {
      console.log(key);
      if (key === 'msg') {
        console.log(value);
      }
      if (key === 'http_result') {
        console.log(value);
      }
    });
  }

  /**
   * testJSON2
   */
  public testJSON2() {
    var json = '{"result":true, "count":["Jose","Ana"]}';
    const obj = JSON.parse(json);

    const myObjStr = JSON.stringify(obj);

    console.log("> \n"+myObjStr);
    // "{"name":"Skip","age":2,"favoriteFood":"Steak"}"

    console.log("> \n"+JSON.parse(myObjStr));

    console.log(obj.count);
    // expected output: 42

    console.log(obj.result);
    // expected output: true
  }

}
