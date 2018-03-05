import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getItems() {
    debugger
    return this.http.get('https://my-json-server.typicode.com/hgelb/FoodManager/items');
  }
}
