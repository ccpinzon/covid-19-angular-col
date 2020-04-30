import { Injectable } from '@angular/core';
import {CovidApiService} from './covid-api.service';
import {CountryModel} from "../models/country.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getDataInt(value) {
    return parseInt(value || 0, 10);
  }

  upperFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1, text.length);
  }

  normalizeString(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  randomRgba() {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    // return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, ${r().toFixed(1)})`;
    return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 1)`;
  }

  degradeRgb(rgb, distance = 1, reverse = false) {
    const degraded = [];
    for (let i = 1; i <= 10; i++) {
      if (i % distance === 0) {
        degraded.push(`rgba(${rgb}, ${i / 10})`);
      }
    }

    if (!reverse) {
      degraded.reverse();
    }
    return degraded;
  }

  countryToFlag(country: CountryModel) {
    // console.log(country);
    if (country.countryCode === 'XX' && country.name === 'world') {
      return '🌎';
    } else if ( country.countryCode === 'XX' && country.name !== 'world' ) {
      return '📍';
    } else {
      return country.countryCode.toUpperCase().replace(/./g, char => String.
      fromCodePoint(char.charCodeAt(0) + 127397));
    }
  }

}
