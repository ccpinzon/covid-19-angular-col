import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CovidApiService} from '../../../services/covid-api.service';
import {NgNavigatorShareService} from 'ng-navigator-share';

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
  private ngNavigatorShareService: NgNavigatorShareService;
  constructor(private router: Router,
              private covidApiService: CovidApiService,
              ngNavigatorShareService: NgNavigatorShareService) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  share() {
    this.ngNavigatorShareService.share({
      title: 'Covid 19 Colombia',
      text: 'Mantente al tanto de lo último del Covid-19',
      url: 'https://covid19colombia.com'
    }).then( (response) => {
     //  console.log(response);
    })
      .catch( (error) => {
       // console.log(error);
      });
  }

  toggleResponsiveMenu() {
    this.slideOut = this.showResponsiveMenu;
    const delay = this.slideOut ? 1000 : 0;
    setTimeout(() => { this.showResponsiveMenu = !this.showResponsiveMenu; }, delay);
  }

  getLastUpdateDate() {
    // const nameCountry = 'global';
    this.covidApiService.getLastUpdate().subscribe(res => {
      // console.log(res);
      const pipe = new DatePipe('en-US');
      const lastDate = new Date(res.date.split(' ').join('T'));
      // console.log(lastDate);
      // this.lastUpdateDate = pipe.transform(lastDate, 'dd/MM/yyyy hh:mm a');
      // console.log(stringColDate);
      this.lastUpdateDate = pipe.transform(lastDate, 'shortTime', 'UTC +14', 'en-US');
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
