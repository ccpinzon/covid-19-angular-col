import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CountryModel} from '../models/country.model';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {SharedService} from './shared.service';
import {PercentModel} from '../models/percent.model';
import {ColombiaDataModel} from '../models/colombia-data.model';
import {DepartmentModel} from '../models/department.model';
import {LastUpdateModel} from '../models/last-update.model';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private readonly baseUrl = 'https://covid-19-col.appspot.com/';

  private readonly apiUrl = `${this.baseUrl}covid19/`;

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  getCountry(countryName: string): Observable<CountryModel> {
    // console.log('call method getCountry');
    return this.http.get<CountryModel>(this.apiUrl + countryName).pipe(
      // retry(1),
      map(country => {
        country.nameEs = !country.nameEs ? this.sharedService.upperFirstLetter(country.name) : country.nameEs;
        return country;
      }),
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
      map(countries => {
        return countries.map(country => {
          country.nameEs = !country.nameEs ? this.sharedService.upperFirstLetter(country.name) : country.nameEs;
          return country;
        });
      }),
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

  getColombiaData(): Observable<ColombiaDataModel[]> {
    return this.http.get<ColombiaDataModel[]>(`${this.baseUrl}c19colombia`)
      .pipe(catchError(this.handleError));
  }

  getDataByDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.baseUrl}c19colombia/casesByDept`)
      .pipe(catchError(this.handleError));
  }

  getLastUpdate(countryName: string): Observable<LastUpdateModel> {
    return countryName === 'colombia' ? this.getLastUpdateColombia() : this.getLastUpdateAllCountries();
  }
  private getLastUpdateAllCountries(): Observable<LastUpdateModel> {
    return this.http.get<LastUpdateModel>(`${this.baseUrl}covid19/lastUpdate`)
      .pipe(catchError(this.handleError));
  }
  private getLastUpdateColombia() {
    return this.http.get<LastUpdateModel>(`${this.baseUrl}c19colombia/lastUpdate`)
      .pipe(catchError(this.handleError));
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
