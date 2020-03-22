import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  toggleResponsiveMenu() {
    this.slideOut = this.showResponsiveMenu;
    const delay = this.slideOut ? 1000 : 0;
    setTimeout(() => { this.showResponsiveMenu = !this.showResponsiveMenu; }, delay);
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 991;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showResponsiveMenu = false;
        this.slideOut = true;
      }
    });
  }

}
