import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() modal = false;
  @Input() maxHeight = false;
  @Input() chartData: {
    name: string,
    title: string,
    flag?: string,
    chartData: {
      type: string,
      data: {
        label: string,
        datasets: Array<any>
      }
    },
    options: {}
  };
  chart;
  fullWidth = false;
  typeChartLogEnable: boolean;
  constructor() {
    // this.enableTypeChart('lineal');
  }

  getOptions(type , chartData) {
    switch (type) {
      case 'line':
        break;
      case 'logarithmic':
        const lenData = chartData.data.datasets[0].data.length;
        // console.log(lenData);
        const min = chartData.data.datasets[0].data[0];
        const max = chartData.data.datasets[0].data[lenData - 1];
        // console.log(min);
        // console.log(max);
        return {
          responsive: true,
          scales: {
            yAxes: [{
              type: 'logarithmic',
              ticks: {
                min: min + lenData   ,
                max: max ,
                // autoSkipPadding: max / lenData,
                userCallback: function(value, index, values) {
                  // Convert the number to a string and splite the string every 3 charaters from the end
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);

                  // Convert the array to a string and format the output
                  value = value.join('.');
                  return value;
                }
              }
            }]
          }
        }
      case 'horizontalBar':
        return {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true
              },
            }],
            xAxes: [{
              ticks: {
                stepSize: 20
              }
            }],
          }
        }
      case 'bar':
        return {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        };
      case 'pie':
        return {};
      case 'doughnut':
        return {};
    }
  }

  renderChart() {
    // console.log('rawData:', this.chartData);
    const {name, chartData} = this.chartData;
    this.fullWidth = chartData.type === 'line';
    // console.log('fullWidth', this.fullWidth, chartData.type);
    let {options} = this.chartData;
    // console.log(options);
    const ctx: any = document.getElementById(`canvas-chart-${name}`);
    ctx.getContext('2d');
    // options = {
    //   ...this.getOptions(chartData.type ,chartData),
    //   ...options
    // };


    let chartOptions = {}
    if (chartData && this.typeChartLogEnable && this.chartData.flag) {
      chartOptions = this.getOptions('logarithmic' ,chartData)
    }else {
      // console.log(chartData.type)
      chartOptions = this.getOptions(chartData.type ,chartData)
    }

    const data = {
      ...chartData,
      options: chartOptions
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, data);
    // console.log('rendering>', this.chart);
  }

  updateData(data) {
    if (!data || !this.chart) { return; }
    const {chartData} = data;
    this.chart.data.datasets = chartData.data.datasets;
    this.chart.data.labels = chartData.data.labels;
    // console.log('rendering data>', JSON.stringify(chartData.data.labels));
    this.chart.update();
    this.renderChart();
  }

  ngOnInit() {
    const renderMobile = () => {
      try {
        if (document.querySelectorAll('.chart-canvas')[0].classList) {
          this.renderChart();
        }
      } catch {
        renderMobile();
      }
    };

    if (this.modal) {
      renderMobile();
    }
  }

  ngAfterViewInit(): void {
    if (this.chartData) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('updatedChartData:', changes);
    if (changes && changes.chartData && !changes.firstChange) {
      this.updateData(this.chartData);
      // console.log(this.chartData)
    }
  }

  enableTypeChart(typeChart: string) {
    this.typeChartLogEnable = typeChart === 'logarithmic' ;
    this.renderChart()
  }
}
