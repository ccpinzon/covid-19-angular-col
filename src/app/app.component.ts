import { Component } from '@angular/core';
import {CovidApiService} from './services/covid-api.service';
import {CountryModel} from './models/country.model';
import {circle, latLng, marker, tileLayer} from 'leaflet';
import {CountryService} from './services/country.service';
import {PercentModel} from './models/percent.model';
import {FormatChartDataService} from './services/format-chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'covid19-col';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  allCountries: CountryModel[] = []
  chartData;
  percentGlobal: PercentModel;
  percentLA: PercentModel;
  renderChart = false;
  widthPercentGlobal = '70%';

  static getDataInt(value) {
    return parseInt(value || 0, 10);
  }

  constructor(private covidApiService: CovidApiService,
              private countryService: CountryService,
              private formatChartData: FormatChartDataService) {
    this.getLatinAmericaList();
    this.getAllCountries();
    this.getPercentGlobal();
    this.getPercentLatinAmerica()

    this.countryService.componentMethodCalled$.subscribe(() => {
      console.log(' get data from country service');
      this.actualCountry = this.countryService.selectedCountry;
      this.chartData = this.countryService.chartData;
      this.renderChart = this.countryService.renderChart;
    });

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

}
