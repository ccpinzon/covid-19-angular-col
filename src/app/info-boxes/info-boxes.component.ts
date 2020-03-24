import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {CountryModel} from '../models/country.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-boxes',
  templateUrl: './info-boxes.component.html',
  styleUrls: ['./info-boxes.component.scss']
})
export class InfoBoxesComponent implements OnInit, OnChanges {
  @Input() currentCountry: CountryModel;

  constructor() { }
  newCases = 0;
  currentlySick = 0;
  rates = {
    mortality: {value: 0, style: {}},
    recovery:  {value: 0, style: {}}
  };

  getNewCases() {
    this.newCases = 0;
    const history = [...this.currentCountry.history];
    // console.log(this.currentCountry.history);
    // console.log(this.currentCountry);
    if (history && history.length > 0) {
      const len = history.length;
      // this.newCases = history.splice(len - 2, 2).reduce((a, b) => b.cases - a.cases);
      this.newCases = this.currentCountry.cases - history[len - 1].cases ;
      if ( this.newCases === 0 ) {
        this.newCases = history.splice(len - 2, 2).reduce((a, b) => b.cases - a.cases);
      }
    }
    // console.log(this.newCases);
  }

  getRates() {
    // console.log(this.currentCountry);
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

  getCurrentSick() {
    this.currentlySick = this.currentCountry.cases - this.currentCountry.deaths - this.currentCountry.cured;
    // console.log(this.currentlySick);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes &&
      changes.currentCountry &&
      changes.currentCountry.currentValue) {
      this.getNewCases();
      this.getRates();
      this.getCurrentSick();
    }
  }
}
