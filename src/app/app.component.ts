import { Component } from '@angular/core';
import {CovidApiService} from './covid-api.service';
import {CountryModel} from './models/country.model';
import {circle, latLng, marker, tileLayer} from 'leaflet';
import {CountryService} from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'covid19-col';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  chartData = {
    currentCountry: {}
  };
  renderChart = false;

  static getDataInt(value) {
    return parseInt(value || 0, 10);
  }

  constructor(private covidApiService: CovidApiService, private countryService: CountryService) {
    this.getLatinAmericaList();

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

}
