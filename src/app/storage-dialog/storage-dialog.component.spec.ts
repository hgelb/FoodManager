import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageDialogComponent } from './storage-dialog.component';

describe('StorageDialogComponent', () => {
  let component: StorageDialogComponent;
  let fixture: ComponentFixture<StorageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
