import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = "";
  msj: string = "";
  text: string = "";
  type: string = "";
  show_LI_SO: boolean = true;
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit() { }

  @Output() messageEvent = new EventEmitter<string>();

  /**
   * logInAdmin Login of an admin
   * @param un UserName
   * @param pw Password
   */
  public logInAdmin(un: string, pw: string) {
    if (un.trim() == "" || pw.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    } else {
      const json = { password: pw, username: un, };
      this.service.logIn(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
        if (jsonWEBAPI.http_result == 1) {
          this.name = un;
          this.sendMessage("true");
          this.signOut();
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
    this.showMessage = true;
  }

  /**
   * registryAdmin Sign Up a Admin
   * @param fn full name
   * @param pn phone number
   * @param em email
   * @param un username
   * @param pw password
   * @param ro rol
   */
  public registryAdmin(fn: string, ln: string, pn: string, em: string, un: string, pw: string, ro: string) {
    if (fn.trim() == "" || ln.trim() == "" || pn.trim() == "" || em.trim() == "" || un.trim() == "" || pw.trim() == "" || ro.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else {
      const json = { full_name: fn + " " + ln, phone_numbr: pn, email: em, username: un, password: pw, role: ro };
      this.service.createAdmin(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); 
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success", 2);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "danger", 2);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
    this.showMessage = true;
  }

  /**
   * sendMessage Tranfers data between component
   * @param check parameter to display the username
   */
  sendMessage(check: string) {
    this.messageEvent.emit(check)
  }

  /**
   * closeMessage Close the modal message
   */
  public closeMessage() {
    this.showMessage = false;
  }

  /**
   * changeModeShow Change windows (LogIn and Sign Out) Admin
   */
  public changeModeShow() {
    this.showMessageErrorLogin = false;
  }

  /**
   * signOut Close general window 
   */
  public signOut() {
    this.show_LI_SO = false;
  }

  /**
   * SignIn Display general window
   */
  public SignIn() {
    this.show_LI_SO = true;
    this.sendMessage("false");
  }

  /**
   * editAlert edit the modal to display 
   * @param msg message to display in modal
   * @param text text to display in modal
   * @param type type of modal
   * @param numAlert number of modal
   */
  public editAlert(msg: string, text: string, type: string, numAlert: number) {
    this.msj = msg; 
    this.text = text; 
    this.type = type;
    if (numAlert == 1) {
      this.showMessageErrorLogin = true;
      this.showMessage = false;
    } else if (numAlert == 2) {
      this.showMessageErrorLogin = false; 
      this.showMessage = true;
    }
    
  }
}
