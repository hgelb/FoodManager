import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {

  form: FormGroup;
  categories: Array<Location>;
  isDuplicate = false;

  constructor(public dialogRef: MatDialogRef<CategoriesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.categories = this.data.categories;
    //create form
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required)//add validation
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
    if (this.categories.find((category) => category.name === this.form.controls.name.value)) {
      this.isDuplicate = true;
    } else {
      this.isDuplicate = false;
    }
  }

}
