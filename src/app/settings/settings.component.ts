import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../app.service';
import {Transform} from '../../utils/Transform';
import {ArrayUtil} from '../../utils/ArrayUtil';
import {StorageDialogComponent} from '../storage-dialog/storage-dialog.component';
import {LocationsDialogComponent} from '../locations-dialog/locations-dialog.component';
import {NotificationsDialogComponent} from '../notifications-dialog/notifications-dialog.component';
import {CategoriesDialogComponent} from '../categories-dialog/categories-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Location, Category, Status, Storage, Notification} from '../../typings';
import {ItemsService} from "../items/items.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  snackbarDuration = 5000;
  locations: Array<Location>;
  categories: Array<Category>;
  statuses: Array<Status>;
  storage: Array<Storage>;
  notifications: Array<Notification>;
  locationsDictionary = {};
  categoriesDictionary = {};
  colorHebEng = {
    'yellow': 'צהוב',
    'blue': 'כחול',
    'purple': 'סגול',
    'red': 'אדום',
    'orange': 'כתום',
    'green': 'ירוק',
    'pink': 'ורוד',
    'brown': 'חום'
  };

  constructor(private route: ActivatedRoute, private service: AppService, private itemsService: ItemsService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  showSnackBar(isError = false) {
    const message = isError ? 'השמירה נכשלה' : 'נשמר בהצלחה!';
    this.snackBar.open(message, '', {duration: this.snackbarDuration});
    // snack bar is material design toast
  }

  showSnackBarDelete(isError = false) {
    const message = isError ? 'המחיקה נכשלה' : 'נמחק בהצלחה!';
    this.snackBar.open(message, '', {duration: this.snackbarDuration});
  }

  openStorageDialog(storage) {//מרחב אחסון
    // open the dialog
    const dialogRef = this.dialog.open(StorageDialogComponent, {
      data: {locations: this.locations, storage: this.storage, existing: storage},
      width: '400px'
    });

    // callback after close
    dialogRef.afterClosed().subscribe(form => {
      if (!form) {
        return;
      }

      let id;
      let isExisting = false;

      // check if has id then this is edit mode
      if (form.controls.id.value) {
        id = form.controls.id.value;
        isExisting = true;
      } else {
        // if not, generate new id. json server doesnt support auto id
        const maxId = ArrayUtil.getMaxId(this.storage);
        id = maxId + 1;
      }

      let storageItem: Storage;
      storageItem = {
        id: id,
        name: form.controls.name.value as string,
        locationId: form.controls.locationId.value as number
      };

      // update on server
      this.service.setStorage(storageItem, isExisting).subscribe(() => {
        if (isExisting) {
          // update existing if success
          const item = this.storage.find((item) => item.id === id);
          item.name = form.controls.name.value;
          item.locationId = form.controls.locationId.value;
        } else {
          this.storage.push(storageItem);
        }
        this.showSnackBar();
      }, () => this.showSnackBar(true));
    });
  }

  openLocationsDialog(location) {
    const dialogRef = this.dialog.open(LocationsDialogComponent, {
      data: {locations: this.locations, existing: location},
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
        const maxId = ArrayUtil.getMaxId(this.storage);
        id = maxId + 1;
      }

      let location: Location;

      location = {
        id: id,
        name: form.controls.name.value as string,
        details: null
      };

      this.service.setLocation(location, isExisting).subscribe(() => {
        if (isExisting) {
          const item = this.locations.find((item) => item.id === id);
          item.name = form.controls.name.value;
        } else {
          this.locationsDictionary[location.id] = location;
          this.locations.push(location);
        }
        this.showSnackBar();
      }, () => this.showSnackBar(true));
    });
  }

  openCategoriesDialog(category) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      data: {categories: this.categories, existing: category},
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
        const maxId = ArrayUtil.getMaxId(this.categories);
        id = maxId + 1;
      }

      // noinspection TsLint
      let category: Category;
      category = {
        id: id,
        name: form.controls.name.value as string
      };

      this.service.setCategory(category, isExisting).subscribe(() => {
        if (isExisting) {
          const item = this.categories.find((item) => item.id === id);
          item.name = form.controls.name.value;
        } else {
          this.categoriesDictionary[category.id] = category;
          this.categories.push(category);
        }

        this.showSnackBar();
      }, () => this.showSnackBar(true));
    });
  }

  openNotificationsDialog(notification) {
    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      data: {
        notifications: this.notifications,
        categories: this.categories,
        colorHebEng: this.colorHebEng,
        existing: notification
      },
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
        const maxId = ArrayUtil.getMaxId(this.notifications);
        id = maxId + 1;
      }

      let notification: Notification;
      notification = {
        id: id,
        daysBefore: form.controls.daysBefore.value as number,
        categoryId: form.controls.categoryId.value as number,
        color: form.controls.color.value as string
      };

      this.service.setNotification(notification, isExisting).subscribe(() => {
        if (isExisting) {
          const item = this.notifications.find((item) => item.id === id);
          item.daysBefore = form.controls.daysBefore.value;
        } else {
          this.notifications.push(notification);
        }
        this.showSnackBar();
      }, () => this.showSnackBar(true));
    });
  }

  deleteStorage(id) {
    // checking if there are item with this storageId
    var items = this.itemsService.items.filter((d) => d.storageId === id);

    if (items.length > 0) {
      if (items.length === 1) {
        this.snackBar.open('ישנו פריט המקושר למיקום זה. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      } else {
        this.snackBar.open('ישנם פריטים המקושרים למיקום זה. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      }

      return;
    }

    this.service.deleteStorage(id).subscribe(() => {
      this.storage = this.storage.filter((item) => item.id !== id);
      this.showSnackBarDelete();
    }, () => this.showSnackBarDelete(true));
  }

  deleteLocation(id) {//מרחב אחסון קשור למיקום
    var storage = this.storage.filter((storage) => storage.locationId === id);

    if (storage.length > 0) {
      if (storage.length === 1) {
        this.snackBar.open('ישנו מרחב אחסון המקושר למיקום זה. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      } else {
        this.snackBar.open('ישנם מרחבי אחסון המקושרים למיקום זה. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      }

      return;
    }

    this.service.deleteLocation(id).subscribe(() => {
      this.locations = this.locations.filter((item) => item.id !== id);
      this.showSnackBarDelete();
    }, () => this.showSnackBarDelete(true));
  }

  deleteCategory(id) {//קטגוריה עם התראה
    var notifications = this.notifications.filter((notification) => notification.categoryId === id);

    if (notifications.length > 0) {
      if (notifications.length === 1) {
        this.snackBar.open('ישנה התראה המקושרת לקטגוריה זה. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      } else {
        this.snackBar.open('ישנן התראות המקושרות לקטגוריה זו. יש לבטל את השיוך טרם המחיקה.', '', {duration: this.snackbarDuration});
      }

      return;
    }

    this.service.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter((item) => item.id !== id);
      this.showSnackBarDelete();
    }, () => this.showSnackBarDelete(true));
  }

  deleteNotification(id) {
    this.service.deleteNotification(id).subscribe(() => {
      this.notifications = this.notifications.filter((item) => item.id !== id);
      this.showSnackBarDelete();
    }, () => this.showSnackBarDelete(true));
  }

  ngOnInit() {
    const data = this.service.getData();//מביא דטה קיימת

    if (data) {
      this.locations = data.locations;
      this.notifications = data.notifications;
      this.statuses = data.statuses;
      this.storage = data.storage;
      this.categories = data.categories;
      this.locationsDictionary = Transform.arrayToDictionary(data.locations);
      this.categoriesDictionary = Transform.arrayToDictionary(data.categories);
    } else {
      this.service.initData().subscribe((results) => {//אם אין דטה קיימת מאתחל את המידע מהשרת בעזרת app service        
        this.locations = results[0] as Array<Location>;
        this.notifications = results[1] as Array<Notification>;
        this.statuses = results[2] as Array<Status>;
        this.storage = results[3] as Array<Storage>;
        this.categories = results[4] as Array<Category>;
        this.locationsDictionary = Transform.arrayToDictionary(this.locations);
        this.categoriesDictionary = Transform.arrayToDictionary(this.categories);
      });
    }
  }
}
