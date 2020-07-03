import { Component, OnInit } from '@angular/core';
import {CovidApiService} from '../services/covid-api.service';
import {FormatChartDataService} from '../services/format-chart-data.service';
import {DepartmentModel} from '../models/department.model';
import {SharedService} from '../services/shared.service';
import {ColombiaService} from '../services/colombia.service';
import {CityCasesModel} from '../models/city-cases.model';
import {PlacesModel} from '../models/places.model';
import {PlaceModalComponent} from '../modal/place-modal/place-modal.component';
import {AutocompletePlaceModel} from "../models/autocomplete-place-model";
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//
// interface DialogData {
//   email: string;
// }

@Component({
  selector: 'app-colombia',
  templateUrl: './colombia.component.html',
  styleUrls: ['./colombia.component.scss']
})
export class ColombiaComponent implements OnInit {

  ageChart;
  departmentsChart;
  citiesChart;
  attentionChart;
  colombiaChart;
  colombiaChartDeaths;
  colombiaChartLog;
  percentageDepartmentsChart;
  departmentData: DepartmentModel[] = [];
  citiesData: PlacesModel[] = [];
  placesList: PlacesModel[] = [];
  countryData;
  currentCountry;
  toggleTable = {
    dep: false,
    attention: false
  };
  isMobile: boolean;
  showTable = {
    dep: false,
    attention: false
  };

  rates = {
    mortality: {value: 0, style: {}},
    recovery:  {value: 0, style: {}}
  };

  modelPlaceOrigin: string;
  hasPlacesOrigin: boolean;
  autocompleteList: AutocompletePlaceModel[] = [];


  weekSelected = 1;
  typeChart: string;
  constructor(private covidApiService: CovidApiService,
              public sharedService: SharedService,
              private colombiaService: ColombiaService,
              private formatChartDataService: FormatChartDataService,
             ) { }

  getChartData(type, data) {
    let chartData;

    switch (type) {
      case 'attention':
        chartData = {
          title: 'Casos por tipo de atención',
          labels: [...data.labels],
          chartData: {...data.sortedAttentionData}
        };
        this.attentionChart = this.formatChartDataService.format(type, chartData);
        break;
      case 'ageAndGender':
        chartData = {
          title: 'Casos por edad y género',
          labels: [...data.labels],
          chartData: {...data.sortedData}
        };
        this.ageChart = this.formatChartDataService.format(type, chartData);
        break;
      case 'departments':
        chartData = {
          title: 'Casos por departamento',
          ...this.colombiaService.getDepartmentData(data)
        };
        this.departmentsChart = this.formatChartDataService.format(type, chartData);

        chartData = {
          title: '% de casos por departamento',
          ...this.colombiaService.getDepartmentData(data)
        };
        this.percentageDepartmentsChart = this.formatChartDataService.format('percentageDepartments', chartData);
        // console.log(this.departmentsChart);
        break;
      case 'cities':
        this.covidApiService.getAllCities()
          .subscribe(cityInfoList => {
            // console.log(data);
            this.citiesData = this.getTopCities(cityInfoList);
            const chartCitiesData = {
              title: '% Ciudades con mas casos',
              ...this.colombiaService.getCityData(cityInfoList)
            };
            this.citiesChart = this.formatChartDataService.format('cities', chartCitiesData);
          });
        // console.log(this.citiesData);
        // console.log(this.citiesChart);
        break;
      case 'history':
        this.colombiaChart = this.formatChartDataService.format(type, data);
        // console.log(this.departmentsChart);
        break;
      case 'historyDeaths':
        // console.log('history detahs -> ' , data);
        this.colombiaChartDeaths = this.formatChartDataService.format(type, data);
        break;
      case 'logarithmic':
        this.colombiaChartLog = this.formatChartDataService.format(type, data);
        // console.log(this.colombiaChartLog);
        break;
    }
  }
  private getTopCities(cityInfoList: PlacesModel[]) {
    cityInfoList.forEach(cityInfo => {
      if (this.currentCountry){
        cityInfo.percentCases = ( cityInfo.cases * 100 ) / this.currentCountry.cases;
      }
    });
    return cityInfoList;
  }
  getColombia() {
    this.covidApiService.getColombiaData()
      .subscribe(data => {

        this.countryData = this.colombiaService.getGenderAndAgeData(data);
        this.getChartData('ageAndGender', this.countryData);
        this.getChartData('attention', this.countryData);
      });
  }

  getDepartments() {
    this.covidApiService.getDataByDepartment()
      .subscribe(data => {
        // console.log(data);
        this.departmentData = data;
        this.getChartData('departments', data);
      });
  }

  getCities() {
    this.covidApiService.getAllCities()
      .subscribe( dataCity => {
        this.citiesData = dataCity;
        // console.log(this.citiesData);
        this.getChartData('cities', dataCity);
      });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
      this.covidApiService.getCountry(countryName).subscribe(res => {
        // console.log('method getCountryByName :', res  );
        this.currentCountry = res;
        const lenHistory = this.currentCountry.history.length;
        switch (this.weekSelected) {
          case 1:
            this.currentCountry.history = this.currentCountry.history.slice(lenHistory - 8, lenHistory);
            break;
          case 2:
            this.currentCountry.history = this.currentCountry.history.slice(lenHistory - 15, lenHistory);
            break;
          case 3:
            this.currentCountry.history = this.currentCountry.history.slice(lenHistory - 20, lenHistory);
            break;
        }
        this.getChartData('history', this.currentCountry);
        this.getChartData('historyDeaths', this.currentCountry);
        this.getChartData('logarithmic', this.currentCountry);

        if (this.isMobile){
          this.getRates();
        }
      });
    }
  }

  toggle(type) {
    this.toggleTable[type] = !this.toggleTable[type];
    const delay = !this.toggleTable[type] ? 1000 : 0;
    setTimeout(() => { this.showTable[type] = this.toggleTable[type]; }, delay);
  }

  selectWeek(weekNumber: number) {
    // console.log('oneWeekChart');
    // console.log(this.colombiaChartLog)
    this.weekSelected = weekNumber;
    if (this.currentCountry) {
      this.getCountryByName(this.currentCountry.name);
    }
    // this.actualCountry.history.slice(0, 2);
  }

  getPlacesListData() {
    this.covidApiService.getPlacesData('departments').subscribe(res => {
      this.placesList = res;
    });
  }


  enableTypeChart(typeChart: string) {
    // console.log(typeChart);
    this.typeChart = typeChart;
  }


  private initComponents() {
    this.isMobile = window.innerWidth < 991;
    console.log('is Mobile? -> ', this.isMobile);
    this.weekSelected = this.isMobile ? 1 : 3;
  }

  getRates() {
    // console.log(this.currentCountry);
    if (this.currentCountry) {
      const recovery = this.currentCountry.percentRecovered ? parseFloat(this.currentCountry.percentRecovered) : 0;
      const mortality = this.currentCountry.cases > 0 ?
        parseFloat(((this.currentCountry.deaths / this.currentCountry.cases) * 100).toFixed(2)) : 0;
      const getStyle = value => ({width: `${value}%`});
      this.rates = {
        recovery: {
          value: recovery,
          style: getStyle(recovery)
        },
        mortality: {
          value: mortality,
          style: getStyle(mortality)
        }
      };
      // console.log(this.rates);
    }

  }


    async ngOnInit() {
      this.initComponents();
      await this.getCountryByName('colombia');
      this.getCities();
      this.getColombia();
      this.getDepartments();
      this.getPlacesListData();

      // this.typeChart = 'lineal';
    }

  getCitiesOrigin(value: string) {
    console.log(value);
  }


  setCoordinatesToOrigin(placeAux: AutocompletePlaceModel) {
    console.log(placeAux.name);
  }
}
