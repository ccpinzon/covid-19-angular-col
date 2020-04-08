import { Component, OnInit } from '@angular/core';
import {CovidApiService} from '../services/covid-api.service';
import {FormatChartDataService} from '../services/format-chart-data.service';
import {DepartmentModel} from '../models/department.model';
import {SharedService} from '../services/shared.service';
import {ColombiaService} from '../services/colombia.service';
import {CityCasesModel} from '../models/city-cases.model';

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
  colombiaChartLog;
  percentageDepartmentsChart;
  departmentData: DepartmentModel[] = [];
  citiesData: CityCasesModel[] = [];
  countryData;
  currentCountry;
  toggleTable = {
    dep: false,
    attention: false
  };
  showTable = {
    dep: false,
    attention: false
  };
  weekSelected = 3;
  constructor(private covidApiService: CovidApiService,
              private sharedService: SharedService,
              private colombiaService: ColombiaService,
              private formatChartDataService: FormatChartDataService) { }

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
        chartData = {
          title: 'Casos por ciudad',
          ...this.colombiaService.getCityData(data)
        };
        this.citiesChart = this.formatChartDataService.format(type, chartData);
        // console.log(this.departmentsChart);
        break;
      case 'history':
        this.colombiaChart = this.formatChartDataService.format(type, data);
        // console.log(this.departmentsChart);
        break;
      case 'logarithmic':
        this.colombiaChartLog = this.formatChartDataService.format(type, data);
        console.log(this.colombiaChartLog);
        break;
    }
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
    this.covidApiService.getDataByCity()
      .subscribe( dataCity => {
        this.citiesData = dataCity;
        this.getChartData('cities', dataCity);
      });
  }

  getCountryByName(countryName: string ) {
    if (countryName) {
      this.covidApiService.getCountry(countryName).subscribe(res => {
        // console.log(`method getCountryByName :  ${JSON.stringify(res)}`);
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
        this.getChartData('logarithmic', this.currentCountry);
      });
    }
  }

  toggle(type) {
    this.toggleTable[type] = !this.toggleTable[type];
    const delay = !this.toggleTable[type] ? 1000 : 0;
    setTimeout(() => { this.showTable[type] = this.toggleTable[type]; }, delay);
  }

  ngOnInit() {
    this.getColombia();
    this.getDepartments();
    // this.getCities();
    this.getCountryByName('colombia');
  }



  selectWeek(weekNumber: number) {
    // console.log('oneWeekChart');
    this.weekSelected = weekNumber;
    if (this.currentCountry) {
      this.getCountryByName(this.currentCountry.name);
    }
    // this.actualCountry.history.slice(0, 2);
  }
}
