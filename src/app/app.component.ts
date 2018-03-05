import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from './app.service';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router, private service: AppService) {
  }
}
