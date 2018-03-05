import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDialogComponent } from './locations-dialog.component';

describe('LocationsDialogComponent', () => {
  let component: LocationsDialogComponent;
  let fixture: ComponentFixture<LocationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
