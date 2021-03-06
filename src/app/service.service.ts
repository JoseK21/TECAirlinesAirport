import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from './interfaces/admin';
import { CCard } from './interfaces/ccard';
import { Customer } from './interfaces/customer';
import { Flight } from './interfaces/flight';
import { Sale } from './interfaces/sale';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  loadUniv:boolean=false;
  private api = 'http://localhost:64660/tecairlines/';

  constructor(private http: HttpClient) { }

  /**
   * Log In Admin
   * @param jsonData dataJson to transfer
   */  
  logIn(jsonData) {   
    const path = `${this.api}admin/login`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }
  
  /**
   * Log In Customer
   * @param jsonData dataJson to transfer
   */
  logInCustomer(jsonData) {    
    const path = `${this.api}login`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Create an acount Admin
   * @param admin dataJson to transfer
   */
  createAdmin(admin: Admin) {  
    const path = `${this.api}admin/signup`;
    return this.http.post(path, "'" + JSON.stringify(admin) + "'", httpOptions);
  }

  /**
   * Create an acount Customer
   * @param customer dataJson to transfer
   */
  createCustomer(customer: Customer) {
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(customer) + "'", httpOptions);
  }

  /**
   * Create a Sale
   * @param sale dataJson to transfer
   */
  createSale(sale: Sale) {
    const path = `${this.api}admin/new-sale`;
    return this.http.post(path, "'" + JSON.stringify(sale) + "'", httpOptions);
  }

  /**
   * Add a card to Customer
   * @param card dataJson to transfer
   */
  addCard(card: CCard) {    
    const path = `${this.api}payment`;
    return this.http.post(path, "'" + JSON.stringify(card) + "'", httpOptions);
  }

  /**
   * Add a university
   * @param jsonData dataJson to transfer
   */
  addUniversity(jsonData) {
    const path = `${this.api}admin/new-uni`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Get all airports
   */
  getAirports() {
    const path = `${this.api}admin/airports`;
    return this.http.get(path);
  }

  /**
   * Get flights by the aerports of deparment and arrival
   * @param jsonData 
   */
  getFlightsByInputs(jsonData){    
    const path = `${this.api}flights`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  
  /**
   * Precheck a customer
   * @param dataFlightId  flight id selected
   */
  PreCheckCustomer(dataFlightId,username){    
    const path = `${this.api}precheck/${username}/${dataFlightId}`;
    return this.http.post(path, "empty", httpOptions);
  }
  
  getListCheck(userName:string){
    const path = `${this.api}${userName}/flights`;
    return this.http.get(path);
  }

  getListCards(userName:string){    
    const path = `${this.api}${userName}/cards`;
    return this.http.get(path);
  }

  /**
   * Get List of Universities
   */
  getUniversities(){
      const path = `${this.api}universities`;      
      return this.http.get(path);      
  }

  /**
   * Pay a Flight
   * @param jsonData dataJson to transfer
   * @param userName username of customer
   */
  payFlight(jsonData, flight_id: string, userName: string) {
    const path = `${this.api}${flight_id}/${userName}/pay-flight`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Check if a customer is a student
   * @param userName 
   */
  isStudent(userName: string) {
    const path = `${this.api}${userName}/student`;
    return this.http.get(path);
  }

  /**
   * Registry a Flight
   * @param flight dataJson to transfer
   */
  registryFlight(flight: Flight){
    const path = `${this.api}admin/new-flight`;
    return this.http.post(path, "'" + JSON.stringify(flight) + "'", httpOptions);
  }

  /**
   * Book a flight
   * @param jsonData dataJson to transfer
   */
  book(jsonData) {    
    const path = `${this.api}booking`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Reservation a flight
   * @param jsonData dataJson to transfer
   * @param userName Customer's userName
   */
  reservation(jsonData,userName:string) {
    const path = `${this.api}${userName}/pay-flight`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Get list of flights ids
   */
  getListFlights_id(){
    const path = `${this.api}admin/flights/active`;      
    return this.http.get(path);      
}
/**
   * Get list of plane model
   */
  getPlaneModel(){
    const path = `${this.api}admin/airplanes`;      
    return this.http.get(path);      
}

  /**
   * Closure a Flight
   * @param id Flight's id 
   */
  closeID(id:string) {
    const path = `${this.api}admin/close/${id}`;
    return this.http.put(path, "'" + id + "'", httpOptions);
  }

  /**
   * Delete Customer
   * @param data customer
   */
  deleteCustomer(data:string) {
    const path = `${this.api}users/delete/${data}`;
    return this.http.delete(path);
  }

  /**
   * Delete Universities
   * @param data university
   */
  deleteUniversity(data:string) {
    const path = `${this.api}universities/delete/${data}`;
    return this.http.delete(path);
  }

  /**
   * Delete Flights
   * @param data flight
   */
  deleteFlight(data:string) {
    const path = `${this.api}flights/delete/${data}`;
    return this.http.delete(path);
  }

  /**
   * Delete Airports
   * @param data airport
   */
  deleteAirport(data:string) {
    const path = `${this.api}airports/delete/${data}`;
    return this.http.delete(path);
  }

  /**
   * Delete Planes
   * @param data plane
   */
  deletePlane(data:string) {
    const path = `${this.api}airplanes/delete/${data}`;
    return this.http.delete(path);
  }


  
}
