import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SharedService} from "./services/shared.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid19-col';
  showResponsiveMenu = false;
  slideOut = true;
  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 991;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showResponsiveMenu = false;
        this.slideOut = true;
      }
    });
  }

  constructor(private router: Router , private sharedService :SharedService) {
  }



}
