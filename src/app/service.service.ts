import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Admin } from './interfaces/admin';
import { CCard } from './interfaces/ccard';
import { Customer } from './interfaces/customer';
import { Flight } from './interfaces/flight';
import { Reservation } from './interfaces/reservation';
import { Sale } from './interfaces/sale';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private api = 'http://localhost:5000/tecairlines/admin/';
  

  constructor(private http: HttpClient) { }

  // Component Home
  logIn(jsonData) {
    console.log("Data sent: "); 
    console.log(jsonData);    
    const path = `${this.api}login/${jsonData}`;
    return this.http.get<Admin>(path);
  }

  createAdmin(admin: Admin) {
    console.log("Data sent: "); 
    console.log(admin);
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(admin) + "'", httpOptions);
  }


  /*
getAllCliente() {
    const path = `${this.api}/`;
    return this.http.get<Cliente[]>(path);
  }

  getCliente(id: string) {
    const path = `${this.api}/${id}`;
    return this.http.get<Cliente>(path);
  }

  createCliente(cliente: Cliente) {
    console.log('>>>>' + cliente)
    const path = `${this.api}/new`;
    return this.http.post(path, "'" + JSON.stringify(cliente) + "'", httpOptions);
  }

  updateCliente(cliente: Cliente) {
    const path = `${this.api}/${cliente.ID}`;
    return this.http.put<Cliente>(path, "'" + JSON.stringify(cliente) + "'");
  }

  deleteCliente(id: string) {
    console.log('>>>>' + id)
    const path = `${this.api}/delete/${id}`;
    return this.http.delete(path);
  }
*/

}
