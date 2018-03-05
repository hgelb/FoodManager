import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Notification} from '../../typings'

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.css']
})
export class NotificationsDialogComponent implements OnInit {

  colors = ['yellow', 'blue', 'purple', 'red', 'orange', 'green', 'pink', 'brown'];

  categories: Array<Category>;
  notifications: Array<Notification>;
  colorHebEng: object;
  form: FormGroup;
  colorError = false;
  daysError = false;

  constructor(public dialogRef: MatDialogRef<NotificationsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.categories = this.data.categories;
    this.notifications = this.data.notifications;
    this.colorHebEng = this.data.colorHebEng;

    this.form = new FormGroup({
      id: new FormControl(''),
      daysBefore: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });

    if (this.data.existing) {
      this.form.controls.id.setValue(this.data.existing.id);
      this.form.controls.daysBefore.setValue(this.data.existing.daysBefore);
      this.form.controls.color.setValue(this.data.existing.color);
      this.form.controls.categoryId.setValue(this.data.existing.categoryId);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange() {
    let daysError = false;
    let colorError = false;

    this.notifications.forEach((notification) => {
      if (notification.id !== this.form.controls.id.value && notification.daysBefore === this.form.controls.daysBefore.value && notification.categoryId === this.form.controls.categoryId.value) {
        daysError = true;
      }

      if (notification.id !== this.form.controls.id.value && notification.color === this.form.controls.color.value) {
        colorError = true;
      }
    });

    this.daysError = daysError;
    this.colorError = colorError;
  }
}
