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
    if ((un.length && pw.length) > 0) {
      this.registry = true;
      this.name = un;   // No recuerdo porque se guardan estas variables, sino eliminar
      this.password = pw;  // No recuerdo porque se guardan estas variables, sino eliminar

      this.logIn(un, pw);
      // Aqui hacer la validacion del resultado de la consulta : show_LI_SO y registry
      this.sendCheck("true");
      this.signOut();
    }
  }

  /**
   * logIn
   * @param un username
   * @param pw password
   */
  public logIn(un: string, pw: string) {
    const json = {
      password: pw,
      username: un,
    };
    this.service.logIn(json).subscribe((jsonTransfer) => {
      console.log(jsonTransfer);
    });
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
    this.service.logIn(json).subscribe((jsonTransfer) => {
      console.log(jsonTransfer);
    });
  }

  /**
   * signOut
   */
  public signOut() {
    this.show_LI_SO = false; //Show Sign Out : SO
    this.name = "";
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
  public registryAdmin(firstName: string, lastName: string, phone: string, email: string, username: string, password: string , rol: string) {
    this.showMessage=true;
    if (firstName.trim() == "" || lastName.trim() == "" || phone.trim() == "" || email.trim() == "" || username.trim() == "" || password.trim() == ""  || rol.trim() == "") {
      this.msj = "Warning! ";
      this.text = "Empty inputs ";
      this.type = "warning";
    } else {
      //Consulta al services : username

      this.createAdmin(firstName+" "+lastName,phone,email,username,password,rol);

      if (username == 'a') {
        this.msj = "Success! ";
        this.text = "Account created ";
        this.type = "success";
      } else {
        this.msj = "Error! ";
        this.text = "This username is used ";
        this.type = "danger";
      }
      console.log("Firtsname: " + firstName + " Lastname:" + lastName + " Phone:" + phone + " Email:" + email + " Rol:" + rol + " Username:" + username + " Password:" + password ); 
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
