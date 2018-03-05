import {OnInit, Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AppService} from '../app.service';
import {Transform} from '../../utils/Transform';
import {HomeDialogComponent} from '../home-dialog/home-dialog.component';
import {ArrayUtil} from '../../utils/ArrayUtil';
import {Item} from '../../typings';
import * as moment from 'moment';
import {ItemsService} from "../items/items.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {
  items: Array<Item> = [];
  categoriesArray: Array<Category>;
  statusesArray: Array<Status>;
  filteredItems: Array<Item> = [];
  filter = '';
  thrownOnly = false;
  throwStatusId: number;
  locations = {};//dictionary O(1)
  categories = {};
  statuses = {};
  storage = {};
  notifications = {};

  // dependency injection AppService instance to local prop this.service
  constructor(private service: AppService, private itemsService: ItemsService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  applyFilter() {//filter by name/status/storage/thrown
    let filterValue = this.filter;
    filterValue = filterValue.toLowerCase();
    this.filter = filterValue;
    this.filteredItems = this.items.filter((item) => {
      return (!filterValue ||
        item.name.search(filterValue) > -1 ||
        this.statuses[item.statusId].name.search(filterValue) > -1 ||
        this.storage[item.storageId].name.search(filterValue) > -1) &&
        (!this.thrownOnly || (this.thrownOnly && item.statusId === this.throwStatusId));
    });
  }

  openDialog(item) {//add&edit item
    // using the 'data' prop we pass data to dialog's HomeDialogComponent
    const dialogRef = this.dialog.open(HomeDialogComponent, {
      data: {locations: this.locations, categories: this.categoriesArray, statuses: this.statusesArray, existing: item},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(form => {
      if (!form) {
        return;
      }

      let id;
      let isExisting = false;

      if (form.controls.id.value) {
        id = form.controls.id.value;
        isExisting = true;
      } else {
        const maxId = ArrayUtil.getMaxId(this.items);
        id = maxId + 1;
      }

      let item: Item;
      item = {
        id: id,
        name: form.controls.name.value,
        categoryId: form.controls.categoryId.value,
        storageId: form.controls.storageId.value,
        expiration: form.controls.expiration.value,
        statusId: 1, // נוצר,
        expirationDisplay: null,
        notificationColor: null
      };

      //   notificationColor: ''
      this.itemsService.setItem(item, isExisting).subscribe(() => {
        if (isExisting) {
          // noinspection TsLint
          const item = this.items.find((item) => item.id === id);
          item.name = form.controls.name.value;
          item.categoryId = form.controls.categoryId.value;
          item.storageId = form.controls.storageId.value;
          item.expiration = form.controls.expiration.value;
          item.statusId = form.controls.statusId.value;
          item.categoryId = form.controls.categoryId.value;
          item.expirationDisplay = moment(form.controls.expiration.value).format('DD/MM/YYYY');
          item.notificationColor = this.getNotificationColor(item.expiration, item.categoryId);
        } else {
          item.expirationDisplay = moment(item.expiration).format('DD/MM/YYYY');
          item.notificationColor = this.getNotificationColor(item.expiration, item.categoryId);
          this.items.push(item);
        }
        this.applyFilter();
        this.snackBar.open('נשמר בהצלחה!', '', {duration: 2000});
      }, () => this.snackBar.open('השמירה נכשלה', '', {duration: 2000}));
    });
  }

  throwItem(item: Item) {
    debugger
    item.statusId = this.throwStatusId;
    this.applyFilter();
  }

  eatItem(item: Item) {
    item.statusId = 2;
    this.applyFilter();
  }

  getNotificationColor(expirationDate, categoryId) {
    const selected = {daysBefore: Number.MAX_SAFE_INTEGER, color: ''};

    // get notification color by expiration and categoryId
    for (const key in this.notifications) {
      const notification = this.notifications[key];
      const dayDiff = moment(expirationDate).diff(Date.now(), 'days'); // days to expiration

      if (dayDiff < selected.daysBefore && dayDiff <= notification.daysBefore && categoryId === notification.categoryId) {
        selected.daysBefore = dayDiff;
        selected.color = notification.color;
      }
    }

    return selected.color;
  }

  getItems() {
    this.itemsService.getItems().subscribe(
      result => {
        // data returned from service
        this.items = result as Array<Item>;
        this.filteredItems = this.items.slice(0); // to clone
        this.items.forEach((item) => {
          item.expirationDisplay = moment(item.expiration).format('DD/MM/YYYY');
          item.notificationColor = this.getNotificationColor(item.expiration, item.categoryId);
        });
      },
      err => console.error(err)
    );
  }

  deleteItem(id) {
    this.itemsService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter((item) => item.id !== id);
      this.snackBar.open('נמחק בהצלחה!', '', {duration: 2000});
      this.applyFilter();
    }, () => this.snackBar.open('מחיקה נכשלה', '', {duration: 2000}));
  }

  ngOnInit() {
    const data = this.service.getData();

    if (!data) {
      this.service.initData().subscribe((results) => {
        this.locations = Transform.arrayToDictionary(results[0]);
        this.notifications = Transform.arrayToDictionary(results[1]);
        this.statuses = Transform.arrayToDictionary(results[2]);
        this.storage = Transform.arrayToDictionary(results[3]);
        this.categories = Transform.arrayToDictionary(results[4]);
        this.categoriesArray = results[4];
        this.statusesArray = results[2];

        const throwStatus = (results[2] as Array<Status>).find((item) => item.name === 'נזרק');
        this.throwStatusId = throwStatus.id;

        this.getItems();
      });
    } else {
      this.getItems();
    }
  }
}
