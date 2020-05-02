import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CountryModel} from '../models/country.model';
import {SharedService} from '../services/shared.service';
import {Percentage} from '../models/percent.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() countries: CountryModel[] = [];
  @Input() percentage: Percentage;
  @Output() country = new EventEmitter();
  deathsReorder: boolean;
  curedReorder: boolean;
  suspectedReorder: boolean;
  casesReorder: boolean;
  currentCountry: CountryModel;
  filteredCountries: CountryModel[] = [];
  query = '';
  private isMobile: boolean;


  constructor(private sharedService: SharedService, private router: Router) {
    this.casesReorder = true;
  }

  selectedCountry(country) {
    if (country) {
      this.currentCountry = country;
      if (country.name !== 'world') {
        // validate mobile
        if (this.isMobile) {
          this.router.navigate(['/countrymobile', country.name]);
        }
        this.country.emit(country.name);
        this.topFunction();
      }
    }
  }
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  reorderByDeaths() {
    if (this.filteredCountries && !this.deathsReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryB.deaths - countryA.deaths);
      this.deathsReorder = true;
    } else if (this.filteredCountries && this.deathsReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryA.deaths - countryB.deaths);
      this.deathsReorder = false;
    }
  }

  reorderByCured() {
    if (this.filteredCountries && !this.curedReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryB.cured - countryA.cured);
      this.curedReorder = true;
    } else if (this.filteredCountries && this.curedReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryA.cured - countryB.cured);
      this.curedReorder = false;
    }
  }

  reorderBySuspected() {
    if (this.filteredCountries && !this.suspectedReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryB.suspects - countryA.suspects);
      this.suspectedReorder = true;
    } else if (this.filteredCountries && this.curedReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryA.suspects - countryB.suspects);
      this.suspectedReorder = false;
    }
  }

  reorderByCases() {
    if (this.filteredCountries && !this.casesReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryB.cases - countryA.cases);
      this.casesReorder = true;
    } else if (this.filteredCountries && this.casesReorder ) {
      this.filteredCountries.sort( (countryA, countryB) =>  countryA.cases - countryB.cases);
      this.casesReorder = false;
    }
  }

  searchCountry() {
    if (this.query) {
      const q = this.sharedService.normalizeString(this.query);
      this.filteredCountries = this.countries
        .filter(c => this.sharedService.normalizeString(c.nameEs).indexOf(q) >= 0
          // || this.sharedService.normalizeString(c.name).indexOf(q) >= 0
        );
      return;
    }
    this.filteredCountries = [...this.countries];
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.countries && changes.countries.currentValue) {
      this.filteredCountries = [...this.countries];
    }
  }

}
