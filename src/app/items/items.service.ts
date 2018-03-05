import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {serverUrl} from '../../constants';
import {Item} from "../../typings";

@Injectable()
export class ItemsService {

  items: Array<Item>;

  constructor(private http: HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getItems() {
    // http.get return rxjs Observable
    const getItems = this.http.get(serverUrl + '/items');
    getItems.subscribe((result) => this.items = result as Array<Item>); // data is loaded and we save it locally
    return getItems; // return Observable
  }

  setItem(item, isExisting = false) {
    if (isExisting) {
      return this.http.put(serverUrl + '/items/' + item.id, item);
    } else {
      return this.http.post(serverUrl + '/items', item);
    }
  }

  deleteItem(id) {
    return this.http.delete(serverUrl + '/items/' + id);
  }
}
