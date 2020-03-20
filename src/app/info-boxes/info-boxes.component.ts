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

}
