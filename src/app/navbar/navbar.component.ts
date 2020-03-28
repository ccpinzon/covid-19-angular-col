import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CovidApiService} from '../services/covid-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showResponsiveMenu = false;
  slideOut = true;
  isMobile = false;
  lastUpdateDate: string;
  constructor(private router: Router, private covidApiService: CovidApiService) { }
  toggleResponsiveMenu() {
    this.slideOut = this.showResponsiveMenu;
    const delay = this.slideOut ? 1000 : 0;
    setTimeout(() => { this.showResponsiveMenu = !this.showResponsiveMenu; }, delay);
  }
  getLastUpdateDate() {
    const nameCountry = 'global';
    this.covidApiService.getLastUpdate(nameCountry).subscribe(res => {
      const pipe = new DatePipe('en-US');
      const lastDate = res.lastDate.split('.')[0].replace(' ', 'T');
      console.log(lastDate)
      this.lastUpdateDate = pipe.transform(lastDate, 'dd/MM/yyyy hh:mm', '+200');
    });
  }
  ngOnInit(): void {
    this.isMobile = window.innerWidth < 991;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showResponsiveMenu = false;
        this.slideOut = true;
      }
    });
    this.getLastUpdateDate();
  }


}
