import {Component, OnInit} from '@angular/core';
import {CovidApiService} from './services/covid-api.service';
import {CountryModel} from './models/country.model';
import {PercentModel} from './models/percent.model';
import {FormatChartDataService} from './services/format-chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid19-col';
  actualCountry: CountryModel;
  latinCountries: CountryModel[] = [];
  allCountries: CountryModel[] = [];
  chartData;
  percentGlobal: PercentModel = {percent: 0, confirmation: false};
  percentLA: PercentModel = {percent: 0, confirmation: false};

  constructor(private covidApiService: CovidApiService,
              private formatChartData: FormatChartDataService) {
    this.getLatinAmericaList();
    this.getAllCountries();
    this.getPercentGlobal();
    this.getPercentLatinAmerica();

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
        if (this.actualCountry.history && this.actualCountry.history.length > 0) {
          this.getChartData('history', this.actualCountry);
        } else {
          // this.getChartData('currentCountry', this.actualCountry);
        }
      });
    }
  }

  getChartData(type, data) {
    // console.log(data);
    if (!data) { return; }
    this.chartData = this.formatChartData.format(type, data);
  }

  onCountrySelected(country) {
    this.getCountryByName(country);
  }

  ngOnInit(): void {
    this.getCountryByName('colombia');
  }

}
