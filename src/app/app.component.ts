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
  widthCol = '250px';
  heightCol = '100%';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  renderChart = false;
  chartData = {
    currentCountry: {}
  };
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

  constructor( private covidApiService: CovidApiService) {
    this.getCountryList();
    this.getCountryByName('colombia');
    console.log(`Country : ${JSON.stringify(this.actualCountry)}`);
  }

  getCountryList() {
    this.covidApiService.getCountryList().subscribe(res => {
      console.log(`getCountryList : ${JSON.stringify(res)}`);
      // order list
      res.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
      this.latinCountries = res;
    });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
        this.covidApiService.getCountry(countryName).subscribe(res => {
          console.log(`method getCountryByName :  ${JSON.stringify(res)}`);
          this.actualCountry = res;
          this.getChartData('currentCountry', this.actualCountry);
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
    console.log('click cases order ')
    if (this.latinCountries && !this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.latinCountries && this.casesReorder ) {
      this.latinCountries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

  private upperFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1, text.length);
  }

  getChartData(type, data) {
    console.log(data);
    if (!data) { return; }
    switch (type) {
      case 'currentCountry':
        this.chartData.currentCountry = {
          name: type,
          country: this.upperFirstLetter(data.name),
          chartData: {
            type: 'doughnut',
            data: {
              labels: ['Casos', 'Muertes', 'Recuperados', 'Sospechosos'],
              datasets: [{
                data: [
                  AppComponent.getDataInt(data.cases),
                  AppComponent.getDataInt(data.deaths),
                  AppComponent.getDataInt(data.cured),
                  AppComponent.getDataInt(data.suspects)
                ],
                backgroundColor: [
                  'rgba(255, 243, 205, 0.2)',
                  'rgba(248, 215, 218, 0.2)',
                  'rgba(212, 237, 218, 0.2)',
                  'rgba(209, 236, 241, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 243, 205, 1)',
                  'rgba(248, 215, 218, 1)',
                  'rgba(212, 237, 218, 1)',
                  'rgba(209, 236, 241, 1)'
                ]
              }]
            }
          }
        };
        break;
    }

    this.renderChart = true;
  }

  onMapClick(event) {
    console.log('map click', event);
  }
}
