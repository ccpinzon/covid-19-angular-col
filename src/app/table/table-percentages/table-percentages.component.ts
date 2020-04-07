import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Percentage} from '../../models/percent.model';

@Component({
  selector: 'app-table-percentages',
  templateUrl: './table-percentages.component.html',
  styleUrls: ['./table-percentages.component.scss']
})
export class TablePercentagesComponent implements OnInit, OnChanges {

  @Input() percentage: Percentage;
  titles = {
    death: 'Muertes',
    sick: 'Enfermos',
    recovered: 'Recuperados'
  };
  percentageList = [];
  constructor() { }

  buildPercentages() {
    for (const p in this.percentage) {
      if (this.percentage.hasOwnProperty(p)) {
        this.percentageList.push({title: this.titles[p], percentage: this.percentage[p], class: p});
      }
    }
    // console.log(this.percentageList);
  }

  ngOnInit() {
    // console.log(this.percentage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.percentage && changes.percentage.currentValue) {
      this.buildPercentages();
    }
  }

}
