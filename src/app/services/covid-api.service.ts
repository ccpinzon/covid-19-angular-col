import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CountryModel} from '../models/country.model';
import {catchError, retry} from 'rxjs/operators';
import {PercentModel} from '../models/percent.model';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private readonly  apiUrl = 'https://covid-19-col.appspot.com/covid19/';

  constructor( private http: HttpClient ) { }

  getCountry(countryName: string): Observable<CountryModel> {
    return this.http.get<CountryModel>(this.apiUrl + countryName).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }
  getCountryList(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getLatinAmericaList(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(this.apiUrl + 'latinAmerica').pipe(
      catchError(this.handleError)
    );
  }

  getPercentGlobal(): Observable<PercentModel> {
    return this.http.get<PercentModel>(this.apiUrl + 'globalPercentRestored').pipe(
      catchError(this.handleError)
    );
  }
  getPercentLatinAmerica(): Observable<PercentModel> {
    return this.http.get<PercentModel>(this.apiUrl + 'latinAmericaPercentRestored').pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
