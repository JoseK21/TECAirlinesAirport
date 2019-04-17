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

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  // Este nombre :messageEvent es el nombre con que el otro componente sabe quien lo esta llamando
  /**
   * Variables and Methods to send data to another componenet
   */

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
        console.log(JSON.parse(userStr));
        JSON.parse(userStr, (key, value) => {
          if (key === 'http_result') {
            console.log(value);
            if (value == 1) {//todo bien
              this.registry = true;
              this.name = un;
              this.sendCheck("true");
              this.signOut();
            } else {
              this.editAlert("Error! ", "Username or password wrong", "danger", 1);
            }
          } else {
            alert("ERROR DE JSON ENVIADO POR WEB API : LOST> http_result");
          }
        });
      });
    } else {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    }
  }

  /**
   * registryAdmin : Change msg
   */
  public registryAdmin(fn: string, pn: string, em: string, un: string, pw: string, ro: string) {
    if (fn.trim() == "" || pn.trim() == "" || em.trim() == "" || un.trim() == "" || pw.trim() == "" || ro.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else {
      const json = { full_name: fn, phone_numbr: pn, email: em, username: un, password: pw, role: ro, };
      this.service.createAdmin(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        console.log(JSON.parse(userStr));
        JSON.parse(userStr, (key, value) => {
          if (key === 'http_result') {
            console.log(value);
            if (value == 1) {//todo bien
              this.editAlert("Success! ", "Account created ", "success", 2);
            } else {
              this.editAlert("Error! ", "This username is used", "danger", 2);
            }
          } else {
            alert("ERROR DE JSON ENVIADO POR WEB API : LOST> http_result");
          }
        });  
      });
    }
    this.showMessage = true;
  }

  /**
   * GRAPHICS METHODS
   */

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
      if (key === 'http_result') {
        console.log(value);
      }
    });
  }
}
