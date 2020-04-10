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

  getOptions(type ,chartData) {
    switch (type) {
      case 'line':
        break;
      case 'logarithmic':
        const lenData = chartData.data.datasets[0].data[0].length - 1
        const min = chartData.data.datasets[0].data[0]
        const max = chartData.data.datasets[0].data[lenData]
        console.log('log')
        return {
          responsive: true,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'LABEL',
              },
              type: 'logarithmic',
              ticks: {
                min: min,
                max: max
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
      console.log(chartData.type)
      chartOptions = this.getOptions(chartData.type ,chartData)
    }

    const data = {
      ...chartData,
      options: chartOptions
    };
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
    console.log('updatedChartData:', changes);
    if (changes && changes.chartData && !changes.firstChange) {
      this.updateData(this.chartData);
      console.log(this.chartData)
    }
  }

  enableTypeChart(typeChart: string) {
    this.typeChartLogEnable = typeChart === 'logarithmic' ;
    this.renderChart()
  }
}
