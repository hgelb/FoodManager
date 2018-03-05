import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: './storage-dialog.component.html',
  styleUrls: ['./storage-dialog.component.css']
})
export class StorageDialogComponent implements OnInit {

  form: FormGroup;
  locations: Array<Location>;
  storage: Array<Storage>;
  isDuplicate = false;

  constructor(public dialogRef: MatDialogRef<StorageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkDuplicate() {
    if (this.storage.find((storage) => storage.name === this.form.controls.name.value && storage.locationId === this.form.controls.locationId.value)) {
      this.isDuplicate = true;
    } else {
      this.isDuplicate = false;
    }
  }

  ngOnInit() {
    this.locations = this.data.locations;
    this.storage = this.data.storage;

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      locationId: new FormControl('', Validators.required)
    });

    if (this.data.existing) {
      this.form.controls.id.setValue(this.data.existing.id);
      this.form.controls.name.setValue(this.data.existing.name);
      this.form.controls.locationId.setValue(this.data.existing.locationId);
    }
  }
}
