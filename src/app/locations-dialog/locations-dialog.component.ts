import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-locations-dialog',
  templateUrl: './locations-dialog.component.html',
  styleUrls: ['./locations-dialog.component.css']
})
export class LocationsDialogComponent implements OnInit {

  form: FormGroup;
  locations: Array<Location>;
  isDuplicate = false;

  constructor(public dialogRef: MatDialogRef<LocationsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.locations = this.data.locations;

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required)
    });

    if (this.data.existing) {
      this.form.controls.id.setValue(this.data.existing.id);
      this.form.controls.name.setValue(this.data.existing.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkDuplicate() {
    if (this.locations.find((location) => location.name === this.form.controls.name.value)) {
      this.isDuplicate = true;
    } else {
      this.isDuplicate = false;
    }
  }

}
