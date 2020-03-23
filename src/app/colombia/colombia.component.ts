import { Component, OnInit } from '@angular/core';
import {CovidApiService} from '../services/covid-api.service';
import {ColombiaDataModel} from '../models/colombia-data.model';
import {FormatChartDataService} from '../services/format-chart-data.service';
import {DepartmentModel} from '../models/department.model';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-colombia',
  templateUrl: './colombia.component.html',
  styleUrls: ['./colombia.component.scss']
})
export class ColombiaComponent implements OnInit {

  ageChart;
  departmentsChart;
  attentionChart;
  departmentData: DepartmentModel[] = [];
  countryData;
  toggleTable = {
    dep: false,
    attention: false
  };
  showTable = {
    dep: false,
    attention: false
  };
  showAttentionTable = false;
  constructor(private covidApiService: CovidApiService,
              private sharedService: SharedService,
              private formatChartDataService: FormatChartDataService) { }

  getGenderAndAgeData(data: ColombiaDataModel[]) {
    // console.time('getGenderAndAgeData');
    let ageLabels = [];
    let ageData = {};
    const getObjArr = arr => {
      const obj = {};
      arr.forEach(i => { obj[i] = []; });
      return obj;
    };
    const genderLabels = ['F', 'M'];
    const attentionLabels = ['Casa', 'Hospital', 'Fallecido'];
    const getObj = (arr) => {
      const obj = {};
      arr.map(d => {
        obj[d] = 0;
      });
      return obj;
    };
    const sortedData = getObjArr(genderLabels);
    const sortedAttentionData = getObjArr(attentionLabels);

    data.forEach(item => {
      if (ageLabels.indexOf(item.ageRange) < 0) {
        ageLabels.push(item.ageRange);
        ageData = {
          ...ageData,
          [item.ageRange]: {
            ...getObj(genderLabels),
            ...getObj(attentionLabels)
          }
        };
      }
      const idx = attentionLabels.indexOf(this.sharedService.upperFirstLetter(item.attention));
      item.attention = attentionLabels[idx];
      ageData[item.ageRange][item.gender] += 1;
      ageData[item.ageRange][item.attention] += 1;
    });

    ageLabels.sort();
    ageLabels = ageLabels.map(label => {
      for (const p in sortedData) {
        if (sortedData.hasOwnProperty(p)) {
          sortedData[p].push(ageData[label][p]);
        }
      }
      for (const p in sortedAttentionData) {
        if (sortedAttentionData.hasOwnProperty(p)) {
          sortedAttentionData[p].push(ageData[label][p]);
        }
      }
      return `${label} años`;
    });

    // console.log({ageLabels, ageData, sortedData, sortedAttentionData});
    // console.timeEnd('getGenderAndAgeData');
    return {
      labels: ageLabels,
      sortedData,
      sortedAttentionData
    };
  }

  getDepartmentData(data: DepartmentModel[]) {
    data.sort((a, b) => b.cases - a.cases);
    const labels = [];
    const chartData = [];

    data.forEach(item => {
      labels.push(item.dept);
      chartData.push(item.cases);
    });
    // console.log({data, labels, chartData});

    return {
      labels,
      chartData
    };
  }

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
          ...this.getDepartmentData(data)
        };
        this.departmentsChart = this.formatChartDataService.format(type, chartData);
        // console.log(this.departmentsChart);
        break;
    }
  }

  getColombia() {
    this.covidApiService.getColombiaData()
      .subscribe(data => {
        // console.log(data);
        this.countryData = this.getGenderAndAgeData(data);
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

  toggle(type) {
    this.toggleTable[type] = !this.toggleTable[type];
    const delay = !this.toggleTable[type] ? 1000 : 0;
    setTimeout(() => { this.showTable[type] = this.toggleTable[type]; }, delay);
  }

  ngOnInit() {
    this.getColombia();
    this.getDepartments();
  }

}
