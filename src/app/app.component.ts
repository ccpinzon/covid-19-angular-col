import { Component } from '@angular/core';
import {CovidApiService} from './covid-api.service';
import {CountryModel} from './models/country.model';
import {circle, latLng, marker, tileLayer} from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'covid19-col';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];

  static getDataInt(value) {
    return parseInt(value || 0, 10);
  }

  constructor(private covidApiService: CovidApiService) {
    this.getLatinAmericaList();
    this.getCountryByName('colombia');
    // console.log(`Country : ${JSON.stringify(this.actualCountry)}`);
  }

  getLatinAmericaList() {
    this.covidApiService.getLatinAmericaList().subscribe(res => {
      // console.log(`getCountryList : ${JSON.stringify(res)}`);
      // order list
      res.sort((countryA, countryB) => countryB.cases - countryA.cases);
      this.latinCountries = res;
    });
  }

  getCountryByName(countryName: string) {
    if (countryName) {
      this.covidApiService.getCountry(countryName).subscribe(res => {
        console.log(` method getCountryByName :  ${JSON.stringify(res)}`);
        this.actualCountry = res;
        // this.getChartData('currentCountry', this.actualCountry);
      });
    }
  }


}
