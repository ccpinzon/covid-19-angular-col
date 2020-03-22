import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormatChartDataService {

  static getDateLabels(data) {
    const pipe = new DatePipe('en-US');
    return data.map(item => pipe.transform(item.date, 'dd/MM/yy'));
  }

  static getCasesData(data) {
    return {
      cases: data.map(item => item.cases),
      deaths: data.map(item => item.deaths)
    };
  }

  constructor(private sharedService: SharedService) { }

  private history(data, type) {
    const labels = FormatChartDataService.getDateLabels(data.history);
    const history = FormatChartDataService.getCasesData(data.history);
    // console.log({labels, history});
    return {
      name: type,
      country: data.nameEs,
      flag: data.flag,
      chartData: {
        type: 'line',
        data: {
          datasets: [
            // {
            //   label: 'Bar Dataset',
            //   data: history.cases
            // },
            {
              label: 'Casos totales',
              data: history.cases,
              // Changes this dataset to become a line
              borderColor: 'rgba(255, 243, 205, 1)',
              backgroundColor: 'rgba(255, 243, 205, 0.2)',
              type: 'line',
              borderWidth: 2
            },
            {
              label: 'Muertes',
              data: history.deaths,
              borderColor: 'rgba(210, 53, 69, 0.6)',
              backgroundColor: 'rgba(210, 53, 69, 0.2)',
              // Changes this dataset to become a line
              type: 'line',
              borderWidth: 2
            }
          ],
          labels
        }
      }
    };
  }

  private currentCountry(data, type) {
    return {
      name: type,
      country: data.nameEs,
      flag: data.flag,
      chartData: {
        type: 'doughnut',
        data: {
          labels: ['Casos', 'Muertes', 'Recuperados', 'Críticos'],
          datasets: [{
            data: [
              this.sharedService.getDataInt(data.cases),
              this.sharedService.getDataInt(data.deaths),
              this.sharedService.getDataInt(data.cured),
              this.sharedService.getDataInt(data.critic)
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
            ],
            borderWidth: 1
          }]
        }
      }
    };
  }

  format(type, data) {
    switch (type) {
      case 'currentCountry':
        return this.currentCountry(data, type);
      case 'history':
        return this.history(data, type);
    }
  }

}
