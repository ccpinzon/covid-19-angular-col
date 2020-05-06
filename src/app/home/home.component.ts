import {Component, OnInit} from '@angular/core';
import {CountryModel} from '../models/country.model';
import {PercentagesModel, PercentModel} from '../models/percent.model';
import {CovidApiService} from '../services/covid-api.service';
import {FormatChartDataService} from '../services/format-chart-data.service';
import {ColombiaService} from '../services/colombia.service';
import {IpGeolocationService} from '../services/ip-geolocation.service';
import {DatePipe} from '@angular/common';
import {CityCasesModel} from '../models/city-cases.model';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private covidApiService: CovidApiService,
              private colombiaService: ColombiaService,
              private formatChartData: FormatChartDataService,
              private ipGeolocationService: IpGeolocationService,
              private shareService: SharedService,
              private router: Router) {
  }
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  allCountries: CountryModel[] = [];
  chartData;
  // modalOpened = false;
  percentGlobal: PercentModel = {percent: 0, confirmation: false};
  percentLA: PercentModel = {percent: 0, confirmation: false};
  colombia: CountryModel;
  isMobile;
  departmentsChart;
  citiesData: CityCasesModel [];
  citiesChart;
  selectedTab = {
    global: false,
    latam: true
  };
  lastUpdateDate: string;
  browser: string;
  tableCityStatus = true;
  chartCityStatus: boolean;
  chartClass: string;
  percentages: PercentagesModel;
  weekSelected = 3;
  typeChart: string;

/*  closeModal() {
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
  }*/
  chartDataDeaths: any;

  getLatinAmericaList() {
    this.covidApiService.getLatinAmericaList().subscribe(res => {
      res.sort((countryA, countryB) => countryB.cases - countryA.cases);
      this.latinCountries = res;
      this.latinCountries.forEach(countryTemp => {
        try {
          countryTemp.flag = this.shareService.countryToFlag(countryTemp);
        } catch (e) {
          console.log(`ERROR COUNTRY FLAG ${countryTemp.name}` );
        }
      });
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
      this.allCountries.forEach(countryTemp => {
        try {
          countryTemp.flag = this.shareService.countryToFlag(countryTemp);
        } catch (e) {
          console.log(`ERROR COUNTRY FLAG ${countryTemp.name}`);
        }
      });
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
          this.getCities();
        }
        this.chartClass =  'col-sm-12';
        const lenHistory = this.actualCountry.history.length;
        switch (this.weekSelected) {
          case 1:
            this.actualCountry.history = this.actualCountry.history.slice(lenHistory - 8, lenHistory);
            break;
          case 2:
            this.actualCountry.history = this.actualCountry.history.slice(lenHistory - 15, lenHistory);
            break;
          case 3:
            this.actualCountry.history = this.actualCountry.history.slice(lenHistory - 20, lenHistory);
            break;
        }
        // console.log('chart data this.actualCountry');
        // console.log(this.actualCountry);
        this.getChartData('history', this.actualCountry);
        this.getChartDataDeaths('historyDeaths', this.actualCountry);
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

  getCities() {
    this.covidApiService.getDataByCity()
      .subscribe(cityInfoList => {
        // console.log(data);
        this.citiesData = this.getTopCities(cityInfoList);
        const chartCitiesData = {
          title: 'Top 10 Ciudades',
          ...this.colombiaService.getCityData(cityInfoList)
        };
        this.citiesChart = this.formatChartData.format('cities', chartCitiesData);
      });
  }

  private getTopCities(cityInfoList: CityCasesModel[]) {
    cityInfoList.forEach(cityInfo => {
      cityInfo.percentCases = ( cityInfo.cases * 100 ) / this.actualCountry.cases;
    });
    return cityInfoList;
  }

  getChartData(type, data) {
    // console.log(data);
    if (!data) { return; }
    const mobile = window.innerWidth < 991;
    if (data.history && data.history.length > 0) {

      if (mobile) {
        // this.modalOpened = true;
      }
      this.chartData = this.formatChartData.format(type, data);
      this.chartDataDeaths = this.formatChartData.format(type, data);
      // console.log(this.chartData)
    } else {
      // this.getChartData('currentCountry', this.actualCountry);
    }
    // console.log('char data -> ' + JSON.stringify(data));
  }
  getChartDataDeaths(type, data) {
    // console.log(data);
    if (!data) { return; }
    const mobile = window.innerWidth < 991;
    if (data.history && data.history.length > 0) {

      if (mobile) {
        // this.modalOpened = true;
      }
      this.chartDataDeaths = this.formatChartData.format(type, data);
      // console.log(this.chartData)
    } else {
      // this.getChartData('currentCountry', this.actualCountry);
    }
    // console.log('char data -> ' + JSON.stringify(data));
  }

  onCountrySelected(country) {
    this.getCountryByName(country);
    if (!this.colombia) {
      // console.log('selecciono pais diferente a oclombia');
      this.chartClass = 'col-sm-12';
    }
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
   validateFirstVisit() {
    if (typeof(Storage) !== 'undefined') {
      const firstVisit = localStorage.getItem('firstVisit');
      if (firstVisit === undefined) {
        localStorage.setItem('firstVisit', 'true');
      }
    }
  }

  private getColombiaInfo() {
    this.getCountryByName('colombia');
  }
  getGeolocationInfo() {
    this.ipGeolocationService.get()
      .subscribe(res => {
        // console.log('GeoInfo:', res);
        if (res) {
          let country = res.country_name ? res.country_name.toLowerCase() : 'colombia';
          if (res.country_code === 'US') {
            country = 'usa';
          } else if (res.country_code === 'CO') {
            if (typeof(Storage) !== 'undefined') {
              // LocalStorage disponible
              const firstVisit = localStorage.getItem('firstVisit');
              if (firstVisit === 'true') {
                this.router.navigate(['/colombia']);
                localStorage.setItem('firstVisit', 'false');
              }
              // this.router.navigate(['/colombia']);

            } else {
              // LocalStorage no soportado en este navegador
            }


          }
          this.getCountryByName(country);
        }
      }, error => {
        this.getCountryByName('colombia');
      });
  }
  getLastUpdateDate() {
    // const nameCountry = this.actualCountry ? this.actualCountry.name : 'global';
    this.covidApiService.getLastUpdate().subscribe(res => {
      // console.log(res);
      const pipe = new DatePipe('en-US');
      const lastDate = new Date(res.date.split(' ').join('T'));
      // console.log(stringColDate);
      this.lastUpdateDate = pipe.transform(lastDate, 'short', 'UTC +14', 'en-US');
    });
  }

  getPercentages() {
    this.covidApiService.getPercentages()
      .subscribe(percentages => {
        this.percentages = percentages;
        // console.log(this.percentages);
      });
  }

  private setBrowser() {
    this.browser = this.getBrowserName();
    // console.log(this.browser);
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
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

  enableCityTable() {
    this.tableCityStatus = true;
    this.chartCityStatus = false;
    this.chartClass = this.colombia ? 'col-sm-8' : 'col-sm-12';
 }

  enableCityChart() {
    this.tableCityStatus = false;
    this.chartCityStatus = true;
    this.chartClass = this.colombia ? 'col-sm-6' : 'col-sm-12';
  }

  selectWeek(weekNumber: number) {
    // console.log('oneWeekChart');
    this.weekSelected = weekNumber;
    if (this.actualCountry) {
      this.getCountryByName(this.actualCountry.name);
    }
    // this.actualCountry.history.slice(0, 2);
  }

  ngOnInit(): void {
    this.getLastUpdateDate();
    this.validateFirstVisit();
    this.getLatinAmericaList();
    this.getAllCountries();
    this.getPercentGlobal();
    // this.getPercentLatinAmerica();
    this.getPercentages();
    // this.closeModal();
    // this.getGeolocationInfo();
    this.getColombiaInfo();
    this.setBrowser();
    this.isMobile = window.innerWidth < 991;
  }


  enableTypeChart(typeChart: string) {
    // console.log(typeChart);
    this.typeChart = typeChart;
  }
}
