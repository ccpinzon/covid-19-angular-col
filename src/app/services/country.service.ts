import { Injectable } from '@angular/core';
import {CountryModel} from '../models/country.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  selectedCountry: CountryModel;
  chartData = {
    currentCountry: {}
  };
  renderChart = false;


  // Observable string sources
  private componentMethodCallSource = new Subject<any>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor() {}

  setSelectedCountry(country: CountryModel) {
    this.selectedCountry = country;
    this.chartData.currentCountry = this.selectedCountry;
    this.renderChart = true;
    console.log( this.selectedCountry);
  }

  callComponentMethod() {
    this.componentMethodCallSource.next();
  }
}
