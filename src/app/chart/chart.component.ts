import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartData: {
    name: string,
    country: string,
    chartData: {
      type: string,
      data: {
        label: string,
        dataset: Array<any>
      }
    },
    options: {}
  };
  chart;
  constructor() { }

  getOptions(type) {
    switch (type) {
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
    const {name, chartData} = this.chartData;
    let {options} = this.chartData;
    const ctx: any = document.getElementById(name);
    ctx.getContext('2d');
    options = {
      ...this.getOptions(chartData.type),
      ...options
    };
    const data = {
      ...chartData,
      options
    };
    // console.log('rendering data>', JSON.stringify(data));

    this.chart = new Chart(ctx, data);
    // console.log('rendering>', chart);
  }

  updateData(data) {
    if (!data || !this.chart) { return; }
    const {chartData} = data;
    this.chart.data.datasets = chartData.data.datasets;
    // console.log('rendering data>', JSON.stringify(chartData.data.datasets));
    this.chart.update();
  }

  ngOnInit() {
    window.addEventListener('load', () => {
      // console.log(this.chartData);
      this.renderChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('updatedChartData:', changes);
    if (changes && changes.chartData && !changes.firstChange) {
      this.updateData(this.chartData);
    }
  }

}
