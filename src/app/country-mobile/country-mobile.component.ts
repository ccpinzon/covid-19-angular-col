import {Component, Input, OnInit} from '@angular/core';
import {CountryModel} from '../models/country.model';
import { ActivatedRoute } from '@angular/router';
import {CovidApiService} from '../services/covid-api.service';
import {FormatChartDataService} from '../services/format-chart-data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-country-mobile',
  templateUrl: './country-mobile.component.html',
  styleUrls: ['./country-mobile.component.scss']
})
export class CountryMobileComponent implements OnInit {
  country: CountryModel;
  chartData;
  weekSelected = 3;
  typeChart: string;
  chartDataDeaths: any;
  constructor(private router: ActivatedRoute,
              private covidApiService: CovidApiService,
              private formatChartData: FormatChartDataService,
              public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getCountry();
  }

  private getCountry() {
    this.router.params.subscribe(params => {
      console.log('param name ->', params.countryName);
      this.covidApiService.getCountry(params.countryName).subscribe(res => {
        this.country = res;
        this.chartData = this.formatChartData.format('history', this.country);
        this.chartDataDeaths = this.formatChartData.format('historyDeaths', this.country);
      });
    });
  }

  selectWeek(weekNumber: number) {
    // console.log('oneWeekChart');
    this.weekSelected = weekNumber;
    if (this.country) {
      this.getCountry();
    }
    // this.actualCountry.history.slice(0, 2);
  }

  enableTypeChart(typeChart: string) {
    this.typeChart = typeChart;
  }
}
