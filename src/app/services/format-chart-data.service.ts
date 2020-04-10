import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { DatePipe } from '@angular/common';

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

  static getCasesDataLog(data) {
    return {cases: data.map(item => item.cases)}
  }

  constructor(private sharedService: SharedService) { }

  private history(data, type) {
    const labels = FormatChartDataService.getDateLabels(data.history);
    const history = FormatChartDataService.getCasesData(data.history);
    // console.log({labels, history});
    return {
      name: type,
      title: data.nameEs,
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
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              pointRadius: 5,
              pointHoverRadius: 8,
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
              pointRadius: 5,
              pointHoverRadius: 8,
              borderWidth: 2
            }
          ],
          labels
        }
      }
    };
  }

  private logarithmic(data, type) {
    const labels = FormatChartDataService.getDateLabels(data.history);
    const history = FormatChartDataService.getCasesDataLog(data.history);
    // console.log({labels, history});
    // const casesLog = FormatChartDataService.getCasesDataLog(history)

    return {
      name: type,
      title: data.nameEs,
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
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              pointRadius: 5,
              pointHoverRadius: 8,
              type: 'line',
              borderWidth: 2
            }
            /*,
            {
              label: 'Muertes',
              data: history.deaths,
              borderColor: 'rgba(210, 53, 69, 0.6)',
              backgroundColor: 'rgba(210, 53, 69, 0.2)',
              // Changes this dataset to become a line
              type: 'line',
              pointRadius: 5,
              pointHoverRadius: 8,
              borderWidth: 2
            }*/
          ],
          labels
        }
      }
    };
  }


  private currentCountry(data, type) {
    return {
      name: type,
      title: data.nameEs,
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

  private ageAndGender(data, type) {
    return {
      name: type,
      title: data.title,
      chartData: {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'F',
              data: data.chartData.F,
              backgroundColor: 'rgba(255, 105, 180, 0.3)',
              borderColor: 'rgba(255, 105, 180, 1)',
              borderWidth: 1
            },
            {
              label: 'M',
              data: data.chartData.M,
              backgroundColor: 'rgba(93, 173, 226, 0.3)',
              borderColor: 'rgba(93, 173, 226, 1)',
              borderWidth: 1
            }
          ]
        }
      }
    };
  }

  private attention(data, type) {
    return {
      name: type,
      title: data.title,
      chartData: {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Casa 🏠',
              data: data.chartData.Casa,
              backgroundColor: 'rgba(82, 190, 128, 0.3)',
              borderColor: 'rgba(82, 190, 128, 1)',
              borderWidth: 1
            },
            {
              label: 'Hospital 🏥',
              data: data.chartData.Hospital,
              backgroundColor: 'rgba(93, 173, 226, 0.3)',
              borderColor: 'rgba(93, 173, 226, 1)',
              borderWidth: 1
            },
            {
              label: 'Fallecido ❌',
              data: data.chartData.Fallecido,
              backgroundColor: 'rgba(231, 76, 60, 0.3)',
              borderColor: 'rgba(231, 76, 60, 1)',
              borderWidth: 1
            }
          ]
        }
      }
    };
  }

  private departments(data, type) {
    const bgColors = [
      ...this.sharedService.degradeRgb('241, 148, 138', 3),
      ...this.sharedService.degradeRgb('93, 173, 226', 3),
      ...this.sharedService.degradeRgb('187, 143, 206', 3),
      ...this.sharedService.degradeRgb('163, 228, 215', 3),
      ...this.sharedService.degradeRgb('166, 172, 175', 3)
    ];
    return {
      name: type,
      title: data.title,
      chartData: {
        type: 'horizontalBar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Casos',
              data: data.chartData,
              backgroundColor: bgColors,
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1
            }
          ]
        }
      }
    };
  }

  private cities(data, type) {
    return {
      name: type,
      title: data.title,
      chartData: {
        type: 'horizontalBar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Casos %',
              data: data.chartData,
              backgroundColor: 'rgba(175, 122, 197, 0.3)',
              borderColor: 'rgba(175, 122, 197, 1)',
              borderWidth: 1
            }
          ]
        }
      }
    };
  }

  private percentageDepartments(data, type) {
    const bgColors = [
      ...this.sharedService.degradeRgb('241, 148, 138', 5),
      ...this.sharedService.degradeRgb('93, 173, 226', 3),
      ...this.sharedService.degradeRgb('187, 143, 206', 3),
      ...this.sharedService.degradeRgb('163, 228, 215', 4),
      ...this.sharedService.degradeRgb('166, 172, 175', 4, true)
    ];
    // console.log(bgColors);
    return {
      name: type,
      title: data.title,
      chartData: {
        type: 'pie',
        data: {
          labels: data.percentages.labels,
          datasets: [{
            data: data.percentages.data,
            backgroundColor: bgColors,
            borderColor: [
              'rgb(255, 255, 255)',
            ],
            borderWidth: 1.5
          }]
        }
      },
      options: {
        legend: {
          display: false,
          position: 'bottom'
        },
        tooltips: {
          enabled: true
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
      case 'logarithmic':
        return this.logarithmic(data, type);
      case 'ageAndGender':
        return this.ageAndGender(data, type);
      case 'departments':
        return this.departments(data, type);
      case 'cities':
        return this.cities(data, type);
      case 'attention':
        return this.attention(data, type);
      case 'percentageDepartments':
        return this.percentageDepartments(data, type);
    }
  }

}
