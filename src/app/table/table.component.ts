import {Component, Input, OnInit} from '@angular/core';
import {CountryModel} from '../models/country.model';
import {CovidApiService} from '../covid-api.service';
import {AppComponent} from '../app.component';
import {circle, latLng, tileLayer} from 'leaflet';
import {CountryService} from '../services/country.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() countries: CountryModel[] = [];
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  actualCountry: CountryModel;
  renderChart = false;


  constructor(private covidApiService: CovidApiService, private countryService: CountryService ) {
    this.casesReorder = true;
    this.getCountryByName('colombia');
  }

  ngOnInit() {
  }

   getCountryByName(countryName: string ) {
    if (countryName) {
      this.covidApiService.getCountry(countryName).subscribe(res => {
        console.log(`method getCountryByName :  ${JSON.stringify(res)}`);
        this.actualCountry = res;
        this.countryService.setSelectedCountry(this.actualCountry);
        this.countryService.callComponentMethod();
        this.getChartData('currentCountry', this.actualCountry);
      });
    }
  }
  private upperFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1, text.length);
  }

  reorderByDeaths() {
    if (this.countries && !this.deathsReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.deaths - countryA.deaths);
      this.deathsReorder = true;
    } else if (this.countries && this.deathsReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.deaths - countryB.deaths);
      this.deathsReorder = false;
    }
  }

  reorderByCured() {
    if (this.countries && !this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.cured - countryA.cured);
      this.curedReorder = true;
    } else if (this.countries && this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.cured - countryB.cured);
      this.curedReorder = false;
    }
  }

  reorderBySuspected() {
    if (this.countries && !this.suspectedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.suspects - countryA.suspects);
      this.suspectedReorder = true;
    } else if (this.countries && this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.suspects - countryB.suspects);
      this.suspectedReorder = false;
    }
  }

  reorderByCases() {
    if (this.countries && !this.casesReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.countries && this.casesReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

  getChartData(type, data) {
    console.log(data);
    console.log(this.countryService.chartData);
    if (!data) { return; }
    switch (type) {
      case 'currentCountry':
        this.countryService.chartData.currentCountry = {
          name: type,
          country: ( !data.nameEs || data.nameEs === '') ? this.upperFirstLetter(data.name) : data.nameEs,
          chartData: {
            type: 'doughnut',
            data: {
              labels: ['Casos', 'Muertes', 'Recuperados', 'Criticos'],
              datasets: [{
                data: [
                  AppComponent.getDataInt(data.cases),
                  AppComponent.getDataInt(data.deaths),
                  AppComponent.getDataInt(data.cured),
                  AppComponent.getDataInt(data.critic)
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
}
