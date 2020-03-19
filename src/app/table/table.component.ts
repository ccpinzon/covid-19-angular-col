import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CountryModel} from '../models/country.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() countries: CountryModel[] = [];
  @Output() country = new EventEmitter();
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  currentCountry: CountryModel;


  constructor() {
    this.casesReorder = true;
  }

  ngOnInit() {  }

  selectedCountry(country) {
    if (country) {
      this.currentCountry = country;
      this.country.emit(country.name);
    }
  }

  reorderByDeaths() {
    if (this.countries && !this.deathsReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.deaths - countryA.deaths);
      this.deathsReorder = true;
    } else if (this.countries && this.deathsReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.deaths - countryB.deaths);
      this.deathsReorder = false;
    }
  }

  reorderByCured() {
    if (this.countries && !this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.cured - countryA.cured);
      this.curedReorder = true;
    } else if (this.countries && this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.cured - countryB.cured);
      this.curedReorder = false;
    }
  }

  reorderBySuspected() {
    if (this.countries && !this.suspectedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.suspects - countryA.suspects);
      this.suspectedReorder = true;
    } else if (this.countries && this.curedReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.suspects - countryB.suspects);
      this.suspectedReorder = false;
    }
  }

  reorderByCases() {
    if (this.countries && !this.casesReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.countries && this.casesReorder ) {
      this.countries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

}
