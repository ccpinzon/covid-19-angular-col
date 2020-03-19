import { Component } from '@angular/core';
import {CovidApiService} from './services/covid-api.service';
import {CountryModel} from './models/country.model';
import {circle, latLng, marker, tileLayer} from 'leaflet';
import {FormatChartDataService} from './services/format-chart-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'covid19-col';
  widthCol = '250px';
  heightCol = '100%';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  chartData;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 10, attribution: '' }),
      // circle([4.039617826768437, -72.59765625000001], { radius: 5000 }),
    ],
    overlays: {
      'Big Circle': circle([4.039617826768437, -72.59765625000001], { radius: 5000 })
    },
    zoom: 3,
    center: latLng(4.039617826768437, -72.59765625000001)
  };


  static getDataInt(value) {
    return parseInt(value || 0, 10);
  }

  constructor(private covidApiService: CovidApiService,
              private formatChartData: FormatChartDataService) {
    this.getLatinAmericaList();
    this.getCountryByName('colombia');
    // console.log(`Country : ${JSON.stringify(this.actualCountry)}`);
  }

  getLatinAmericaList() {
    this.covidApiService.getLatinAmericaList().subscribe(res => {
      // console.log(`getCountryList : ${JSON.stringify(res)}`);
      // order list
      res.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
      this.latinCountries = res;
    });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
        this.covidApiService.getCountry(countryName).subscribe(res => {
          // console.log(`method getCountryByName :  ${JSON.stringify(res)}`);
          this.actualCountry = res;
          if (this.actualCountry.history && this.actualCountry.history.length > 0) {
            this.getChartData('history', this.actualCountry);
          } else {
            // this.getChartData('currentCountry', this.actualCountry);
          }
        });
    }
  }

  reorderByDeaths() {
    if (this.latinCountries && !this.deathsReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.deaths - countryA.deaths);
      this.deathsReorder = true;
    } else if (this.latinCountries && this.deathsReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.deaths - countryB.deaths);
      this.deathsReorder = false;
    }
  }

  reorderByCured() {
    if (this.latinCountries && !this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.cured - countryA.cured);
      this.curedReorder = true;
    } else if (this.latinCountries && this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.cured - countryB.cured);
      this.curedReorder = false;
    }
  }

  reorderBySuspected() {
    if (this.latinCountries && !this.suspectedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.suspects - countryA.suspects);
      this.suspectedReorder = true;
    } else if (this.latinCountries && this.curedReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.suspects - countryB.suspects);
      this.suspectedReorder = false;
    }
  }

  reorderByCases() {
    // console.log('click cases order ')
    if (this.latinCountries && !this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.latinCountries && this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

  getChartData(type, data) {
    // console.log(data);
    if (!data) { return; }
    this.chartData = this.formatChartData.format(type, data);
  }

  onMapClick(event) {
    console.log('map click', event);
  }
}
