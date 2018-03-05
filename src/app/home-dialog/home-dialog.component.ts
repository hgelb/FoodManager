import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {Location, Storage, Status, Category} from '../../typings';

@Component({
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.css']
})
export class HomeDialogComponent implements OnInit {

  form: FormGroup;
  locations: Array<Location>;
  categories: Array<Category>;
  statuses: Array<Status>;
  storage: Array<Storage>;

  constructor(public dialogRef: MatDialogRef<HomeDialogComponent>,
              private service: AppService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const serviceData = this.service.getData();
    this.storage = serviceData.storage;
    this.locations = this.data.locations;
    this.categories = this.data.categories;
    this.statuses = this.data.statuses;

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      statusId: new FormControl(''),
      categoryId: new FormControl('', Validators.required),
      storageId: new FormControl('', Validators.required),
      expiration: new FormControl('', [Validators.required, Validators.pattern(`\\d{4}-\\d{2}-\\d{2}`)])
    });

    if (this.data.existing) {
      this.form.controls.id.setValue(this.data.existing.id);
      this.form.controls.categoryId.setValue(this.data.existing.categoryId);
      this.form.controls.storageId.setValue(this.data.existing.storageId);
      this.form.controls.statusId.setValue(this.data.existing.statusId);
      this.form.controls.name.setValue(this.data.existing.name);
      this.form.controls.expiration.setValue(this.data.existing.expiration);
    }
  }
}
