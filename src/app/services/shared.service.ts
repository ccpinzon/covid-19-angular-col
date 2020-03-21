import { Injectable } from '@angular/core';

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

}