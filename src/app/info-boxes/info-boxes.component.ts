import { Component, OnInit, Input } from '@angular/core';
import {CountryModel} from '../models/country.model';

@Component({
  selector: 'app-info-boxes',
  templateUrl: './info-boxes.component.html',
  styleUrls: ['./info-boxes.component.scss']
})
export class InfoBoxesComponent implements OnInit {
  @Input() currentCountry: CountryModel;
  constructor() { }

  ngOnInit() {
  }

  getStylePercentCurrentCountry(): any {
    if (this.currentCountry.percentRecovered) {
      const styleData = +this.currentCountry.percentRecovered < 2 ? 9 : this.currentCountry.percentRecovered;
      const style = {width: styleData + '%'};
      // console.log(style);
      return style;
    }
  }
}
