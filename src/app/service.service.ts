import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  loadUniv:boolean=false;

  private api = 'http://localhost:64660/tecairlines/';
  constructor(private http: HttpClient) { }

  // Component Home
  logIn(jsonData) {
    console.log("Data sent>");
    console.log(jsonData);
    const path = `${this.api}admin/login`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  createAdmin(admin: Admin) {
    console.log("Data sent>");
    console.log(admin);
    const path = `${this.api}admin/signup`;
    return this.http.post(path, "'" + JSON.stringify(admin) + "'", httpOptions);
  }

  // Component Sign Up
  createCustomer(customer: Customer) {
    console.log("Data sent>");
    console.log(customer);
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(customer) + "'", httpOptions);
  }

  createSale(sale: Sale) {
    console.log("Data sent>");
    console.log(sale);
    const path = `${this.api}admin/new-sale`;
    return this.http.post(path, "'" + JSON.stringify(sale) + "'", httpOptions);
  }

  // Component Search Flight
  getAirports() {
    console.log("Get all Airports>");
    const path = `${this.api}admin/airports`;
    return this.http.get(path);
  }

  // Component Registry Flight  
  registryFlight(flight: Flight){
    console.log("Data sent>");
    console.log(flight);
    const path = `${this.api}admin/new-flight`;
    return this.http.post(path, "'" + JSON.stringify(flight) + "'", httpOptions);
  }

  // Component Search flights
  getAirportByInputs(jsonData){
    console.log("Data sent>");
    console.log(jsonData);
    const path = `${this.api}flights`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);

  }
  getUniversities(){
      console.log("Get all universities>");
      const path = `${this.api}universities`;      
      return this.http.get(path);      
  }

  getListFlights_id(){
    console.log("Get List Flight IDs>");  
    const path = `${this.api}admin/flights/active`;      
    return this.http.get(path);      
}

  //Closure a Flight
  closeID(id:number) {
    console.log("Data sent>");
    console.log(id);
    const path = `${this.api}admin/close/${id}`;
    return this.http.put(path, "'" + id + "'", httpOptions);
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
