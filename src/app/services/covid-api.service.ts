import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CountryModel} from '../models/country.model';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from './shared.service';
import {PercentagesModel, PercentModel} from '../models/percent.model';
import {ColombiaDataModel} from '../models/colombia-data.model';
import {DepartmentModel} from '../models/department.model';
import {LastUpdateModel} from '../models/last-update.model';
import {CityCasesModel} from '../models/city-cases.model';
import {PlacesModel} from '../models/places.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {

  private readonly baseUrl = environment.urlApi;
  private readonly apiUrl = `${this.baseUrl}countries/`;

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  getCountry(countryName: string): Observable<CountryModel> {
    // console.log('call method getCountry');
    return this.http.get<CountryModel>(this.apiUrl + countryName).pipe(
      // retry(1),
      map(country => {
        country.nameEs = !country.nameEs ? this.sharedService.upperFirstLetter(country.name) : country.nameEs;
        country.flag = this.sharedService.countryToFlag(country);
        // console.log(country);
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
    return this.http.get<ColombiaDataModel[]>(`${this.baseUrl}colombia`)
      .pipe(catchError(this.handleError));
  }

  getDataByDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(`${this.baseUrl}departments`)
      .pipe(catchError(this.handleError));
  }

  getDataByCity(): Observable<CityCasesModel[]> {
    return this.http.get<CityCasesModel[]>(`${this.baseUrl}cities`)
      .pipe(catchError(this.handleError));
  }

  getLastUpdate(): Observable<LastUpdateModel> {
    // const res = this.getLastUpdateAllCountries();
    // const pipe = new DatePipe('en-US');
    // const lastDate = new Date(res.split(' ').join('T'));
    // const stringColDate = pipe.transform(lastDate, 'short', 'UTC -10', 'en-US' );
    // console.log(stringColDate);
    return this.getLastUpdateAllCountries();
  }

  private getLastUpdateAllCountries(): Observable<LastUpdateModel> {
    return this.http.get<LastUpdateModel>(`${this.apiUrl}lastUpdate`)
      .pipe(catchError(this.handleError));
  }


  getSelfAssessmentQuestions(): Observable<any> {
    return this.http.get(`https://covid-19-col.appspot.com/self-assessment/question`)
      .pipe(catchError(this.handleError));
  }

  saveSelfAssessmentResults(result): Observable<any> {
    return this.http.post(`https://covid-19-col.appspot.com/self-assessment/result`, result)
      .pipe(catchError(this.handleError));
  }

  getPercentages(): Observable<PercentagesModel> {
    return this.http.get<PercentagesModel>(`${this.apiUrl}percentages`)
      .pipe(catchError(this.handleError));
  }

  getPlacesData(type: string): Observable<PlacesModel[]> {
    if (type === 'departments') {
      return this.http.get<PlacesModel[]>(`${this.baseUrl}departments`)
        .pipe(catchError(this.handleError));
    }
    return undefined;

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
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getCitiesFromDepData(nameDept: string): Observable<PlacesModel[]> {

    return this.http.get<PlacesModel[]>(`${this.baseUrl}cities/${nameDept}`)
      .pipe(catchError(this.handleError));
  }

  getAllCities(): Observable<PlacesModel[]> {
    return this.http.get<PlacesModel[]>(`${this.baseUrl}cities`).pipe(catchError(this.handleError));
  }



}
