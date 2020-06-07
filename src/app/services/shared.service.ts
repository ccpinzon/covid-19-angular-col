import {ElementRef, Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {CountryModel} from "../models/country.model";
import {DOCUMENT} from "@angular/common";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  darkModeEnable = true;

  // observable
  private componentMethodCallSource = new Subject<any>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();


  private render: Renderer2;

  constructor(@Inject(DOCUMENT) document, rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null,null);
  }

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

  switchDarkMode() {
    this.darkModeEnable = !this.darkModeEnable;
    // console.log('dark mode -> ', this.darkModeEnable);
    if (this.darkModeEnable){
      // this.r.addClass(document.body, 'myclass');
      this.render.addClass(document.body, 'dark-theme');
      // this.render.addClass(document['mat-dialog-container'], 'dark-theme');
    }else {
      this.render.removeClass(document['body'], 'dark-theme');
      // this.render.removeClass(document['mat-dialog-container'], 'dark-theme');
    }
    /*if (this.darkModeEnable) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#343a40';
      this.elementRef.nativeElement.ownerDocument.body.style.color = '#fff';
    }else {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';
      this.elementRef.nativeElement.ownerDocument.body.style.color = '#343a40';
    }*/
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

  callComponentMethod() {
    this.componentMethodCallSource.next();
  }

}
