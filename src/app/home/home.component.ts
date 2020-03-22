import { Component, OnInit } from '@angular/core';
import { CountryModel } from '../models/country.model';
import { PercentModel } from '../models/percent.model';
import { CovidApiService } from '../services/covid-api.service';
import { FormatChartDataService } from '../services/format-chart-data.service';

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
  selectedTab = {
    global: false,
    latam: true
  };

  constructor(private covidApiService: CovidApiService,
              private formatChartData: FormatChartDataService) {}

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
        this.getChartData('history', this.actualCountry);
        if (countryName.toLowerCase().indexOf('colombia') >= 0) {
          this.colombia = res;
        }
      });
    }
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


  ngOnInit(): void {
    this.getLatinAmericaList();
    this.getAllCountries();
    this.getPercentGlobal();
    this.getPercentLatinAmerica();
    this.getCountryByName('colombia');
    this.closeModal();
    this.isMobile = window.innerWidth < 991;
  }
}
