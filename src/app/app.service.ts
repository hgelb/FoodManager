import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Location, Notification, Storage, Status, Category} from '../typings';
import {serverUrl} from '../constants';

@Injectable()
export class AppService {//singelton

  locations: Array<Location>;
  notifications: Array<Notification>;
  statuses: Array<Status>;
  storage: Array<Storage>;
  categories: Array<Category>;
  activeFork: any;
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.initData();
  }

  initData() {
    if (this.activeFork) {
      return this.activeFork;
    }

    const locations = this.getLocations();
    const notifications = this.getNotifications();
    const statuses = this.getStatuses();
    const storage = this.getStorage();
    const categories = this.getCategories();
    //5 calls async one notification
    this.activeFork = forkJoin([locations, notifications, statuses, storage, categories]);

    this.activeFork.subscribe((results) => {//save the data on the instance
      this.activeFork = null;
      this.locations = results[0] as Array<Location>;
      this.notifications = results[1] as Array<Notification>;
      this.statuses = results[2] as Array<Status>;
      this.storage = results[3] as Array<Storage>;
      this.categories = results[4] as Array<Category>;
    });

    return this.activeFork;
  }

  getData() {
    if (!this.locations || !this.notifications || !this.statuses || !this.storage) {
      return null;
    }

    return {
      locations: this.locations,
      notifications: this.notifications,
      statuses: this.statuses,
      storage: this.storage,
      categories: this.categories
    };
  }

  getStorage() {
    // get data from our local json-server --watch src\db.json
    return this.http.get(serverUrl + '/storage');
  }

  getLocations() {
    return this.http.get(serverUrl + '/locations');
  }

  getCategories() {
    return this.http.get(serverUrl + '/categories');
  }

  getNotifications() {
    return this.http.get(serverUrl + '/notifications');
  }

  getStatuses() {
    return this.http.get(serverUrl + '/status');
  }

  setLocation(location, isExisting = false) {
    if (isExisting) {
      return this.http.put(serverUrl + '/locations/' + location.id, location);
    } else {
      return this.http.post(serverUrl + '/locations', location);
    }
  }

  setCategory(category, isExisting = false) {
    if (isExisting) {
      return this.http.put(serverUrl + '/categories/' + category.id, category);
    } else {
      return this.http.post(serverUrl + '/categories', category);

    }
  }

  setStorage(storage, isExisting = false) {
    if (isExisting) {
      return this.http.put(serverUrl + '/storage/' + storage.id, storage);
    } else {
      return this.http.post(serverUrl + '/storage', storage);
    }
  }

  setNotification(notification, isExisting = false) {
    if (isExisting) {
      return this.http.put(serverUrl + '/notifications/' + notification.id, notification);
    } else {
      return this.http.post(serverUrl + '/notifications', notification);
    }
  }

  deleteStorage(id) {
    return this.http.delete(serverUrl + '/storage/' + id);
  }

  deleteCategory(id) {
    return this.http.delete(serverUrl + '/categories/' + id);
  }

  deleteLocation(id) {
    return this.http.delete(serverUrl + '/locations/' + id);
  }

  deleteNotification(id) {
    return this.http.delete(serverUrl + '/notifications/' + id);
  }
}
