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
  validAdmin: number = 0;
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
  public setStatusRegistry(un: string, pw: string) {

    if (un.length > 0 && pw.length > 0) {
      this.logIn(un, pw);
    } else {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    }
  }

  /**
   * logIn
   * @param un username
   * @param pw password
   */
  private logIn(un: string, pw: string) {
    const json = {
      password: pw,
      username: un,
    };
    this.service.logIn(json).subscribe((jsonTransfer) => {
      if (jsonTransfer == 'error') {  //Username or password wrong
        this.editAlert("Error! ", "Username or password wrong", "danger", 1);
      } else {  // All is correct
        this.registry = true;
        this.name = un;
        this.sendCheck("true");
        this.signOut();
      }
      console.log(jsonTransfer);
      
    });
    // Quitar cuando se verifique correctamente el usuario 
    this.registry = true;
    this.name = un;
    this.sendCheck("true");
    this.signOut();
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
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessageErrorLogin = false;
  }

  /**
   * createAdmin
   */
  public createAdmin(fn: string, pn: string, em: string, un: string, pw: string, ro: string) {
    const json = {
      full_name: fn,
      phone_numbr: pn,
      email: em,
      username: un,
      password: pw,
      role: ro,
    };
    this.service.createAdmin(json).subscribe((jsonTransfer) => {
      console.log(jsonTransfer);
    });
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
   * registryAdmin : Change msg
   */
  public registryAdmin(firstName: string, lastName: string, phone: string, email: string, username: string, password: string, rol: string) {

    if (firstName.trim() == "" || lastName.trim() == "" || phone.trim() == "" || email.trim() == "" || username.trim() == "" || password.trim() == "" || rol.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else {
      //Consulta al services : username

      this.createAdmin(firstName + " " + lastName, phone, email, username, password, rol);

      if (username == 'a') {
        this.editAlert("Success! ", "Account created ", "success", 2);
      } else {
        this.editAlert("Error! ", "This username is used", "danger", 2);
      }
      console.log("Firtsname: " + firstName + " Lastname:" + lastName + " Phone:" + phone + " Email:" + email + " Rol:" + rol + " Username:" + username + " Password:" + password);
    }
    this.showMessage = true;
  }

  /**
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }
}
