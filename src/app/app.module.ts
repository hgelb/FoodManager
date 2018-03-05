import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';  // replaces previous Http service
import {AppRoutingModule} from './app-routing.module';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatTabsModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {AppService} from './app.service';
import {HomeDialogComponent} from './home-dialog/home-dialog.component';
import {StorageDialogComponent} from './storage-dialog/storage-dialog.component';
import {LocationsDialogComponent} from './locations-dialog/locations-dialog.component';
import {NotificationsDialogComponent} from './notifications-dialog/notifications-dialog.component';
import {CategoriesDialogComponent} from './categories-dialog/categories-dialog.component';
import {ItemsService} from './items/items.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HomeDialogComponent,
    StorageDialogComponent,
    LocationsDialogComponent,
    NotificationsDialogComponent,
    CategoriesDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [AppService, ItemsService],
  bootstrap: [AppComponent],
  entryComponents: [
    HomeDialogComponent,
    StorageDialogComponent,
    LocationsDialogComponent,
    NotificationsDialogComponent,
    CategoriesDialogComponent
  ]
})
export class AppModule {
}
