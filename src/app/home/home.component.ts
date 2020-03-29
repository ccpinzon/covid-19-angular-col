import { Component, OnInit } from '@angular/core';
import { CountryModel } from '../models/country.model';
import { PercentModel } from '../models/percent.model';
import { CovidApiService } from '../services/covid-api.service';
import { FormatChartDataService } from '../services/format-chart-data.service';
import {ColombiaService} from '../services/colombia.service';
import {IpGeolocationService} from '../services/ip-geolocation.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  allCountries: CountryModel[] = [];
  chartData;
  modalOpened = false;
  percentGlobal: PercentModel = {percent: 0, confirmation: false};
  percentLA: PercentModel = {percent: 0, confirmation: false};
  colombia: CountryModel;
  isMobile;
  departmentsChart;
  selectedTab = {
    global: false,
    latam: true
  };
  lastUpdateDate: string;
  browser: string;

  constructor(private covidApiService: CovidApiService,
              private colombiaService: ColombiaService,
              private formatChartData: FormatChartDataService,
              private ipGeolocationService: IpGeolocationService) {
  }

  getLatinAmericaList() {
    this.covidApiService.getLatinAmericaList().subscribe(res => {
      res.sort((countryA, countryB) => countryB.cases - countryA.cases);
      this.latinCountries = res;
    });
  }
  getPercentGlobal() {
    this.covidApiService.getPercentGlobal().subscribe( res => {
      this.percentGlobal = res;
    });
  }

  getPercentLatinAmerica() {
    this.covidApiService.getPercentLatinAmerica().subscribe( res => {
      this.percentLA = res;
    });
  }

  getAllCountries() {
    this.covidApiService.getCountryList().subscribe(res => {
      res.sort((countryA, countryB) => countryB.cases - countryA.cases);
      this.allCountries = res;
    });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
      this.covidApiService.getCountry(countryName).subscribe(res => {
        // console.log(`method getCountryByName :  ${JSON.stringify(res)}`);
        this.actualCountry = res;
        this.departmentsChart =  null;
        this.colombia =  null;
        if (countryName.toLowerCase().indexOf('colombia') >= 0) {
          this.colombia = res;
          this.getDepartments();
        }
        this.getChartData('history', this.actualCountry);
      });
    }
  }

  getDepartments() {
    this.covidApiService.getDataByDepartment()
      .subscribe(data => {
        // console.log(data);
        const chartData = {
          title: 'Casos por departamento',
          ...this.colombiaService.getDepartmentData(data)
        };
        this.departmentsChart = this.formatChartData.format('departments', chartData);
        this.getChartData('departments', data);
      });
  }

  getChartData(type, data) {
    // console.log(data);
    if (!data) { return; }
    const mobile = window.innerWidth < 991;
    if (data.history && data.history.length > 0) {

      if (mobile) {
        this.modalOpened = true;
      }
      this.chartData = this.formatChartData.format(type, data);
    } else {
      // this.getChartData('currentCountry', this.actualCountry);
    }
    // console.log('char data -> ' + JSON.stringify(data));
  }

  onCountrySelected(country) {
    this.getCountryByName(country);
  }

  closeModal() {
    document.addEventListener('click', (event: any) => {
      if (this.isMobile && this.modalOpened) {
        const modalClass = 'chart-modal';
        if (event.target.classList.contains('close') ||
          (!event.target.classList.contains(modalClass) &&
            !event.target.closest('.' + modalClass))) {
          // console.log('closing modal!');
          this.modalOpened = false;
        }
      }
    });
    this.modalOpened = false;
  }

  selectTab(opt) {
    this.selectedTab = {
      latam: false,
      global: false
    };

    switch (opt) {
      case 'latam':
        this.selectedTab.latam = true;
        break;
      case 'global':
        this.selectedTab.global = true;
        break;
    }
  }

  getGeolocationInfo() {
    this.ipGeolocationService.get()
      .subscribe(res => {
        // console.log('GeoInfo:', res);
        if (res) {
          let country = res.country_name ? res.country_name.toLowerCase() : 'colombia';
          if (res.country_code === 'US') {
            country = 'usa';
          }
          this.getCountryByName(country);
        }
      }, error => {
        this.getCountryByName('colombia');
      });
  }
  getLastUpdateDate() {
    const nameCountry = this.actualCountry ? this.actualCountry.name : 'global';
    this.covidApiService.getLastUpdate(nameCountry).subscribe(res => {
      const pipe = new DatePipe('en-US');
      const lastDate = res.lastDate.split('.')[0].replace(' ', 'T');
     //  console.log(lastDate)
      this.lastUpdateDate = pipe.transform(lastDate, 'dd/MM/yyyy hh:mm', '+200');
    });
  }


  ngOnInit(): void {
    this.getLatinAmericaList();
    this.getAllCountries();
    this.getPercentGlobal();
    this.getPercentLatinAmerica();
    this.closeModal();
    this.getGeolocationInfo();
    this.getLastUpdateDate();
    this.setBrowser();
    this.isMobile = window.innerWidth < 991;
  }
  private setBrowser() {
    this.browser = this.getBrowserName();
    // console.log(this.browser);
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(window as any).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
}
