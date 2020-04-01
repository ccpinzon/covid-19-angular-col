import { Component, OnInit} from '@angular/core';
import {DepartmentModel} from '../models/department.model';
import {CovidApiService} from '../services/covid-api.service';


@Component({
  selector: 'app-mapa-colombia',
  templateUrl: './mapa-colombia.component.html',
  styleUrls: ['./mapa-colombia.component.scss']
})
export class MapaColombiaComponent implements OnInit {

  mainTittle = 'Ubicación de covid-19 en Colombia';
  departmentData: DepartmentModel[] = [];
  geoData = {
    type: 'FeatureCollection',
    features: []
  };


  showPopUp = false;
  selectedPoint = null;
  popUpInfo = '';

  constructor(private covidApiService: CovidApiService) {}

  onGeolocate(event) {
    console.log(event);
  }

  getDepartments() {
    this.covidApiService.getDataByDepartment()
      .subscribe(data => {
        this.departmentData = data;
        this.buildGeoJson();
      });
  }

  buildGeoJson() {
    if (this.departmentData.length > 0) {
      this.departmentData.forEach(department => {
        const feature = {
          type: 'Feature',
          properties: {
            message: '<strong>' + department.dept + '</strong> <br>' + department.cases + ' casos.',
            iconSize: [60, 60]
          },
          geometry: {
            type: 'Point',
            coordinates: [department.lat, department.lng]
          }
        };
        this.geoData.features.push(feature);
      });
    }
  }

  showPopUpInfo(feature, show) {
    console.log('¿show popup? ', show);
    if (show) {
      this.showPopUp = true;
      this.popUpInfo = feature.properties.message;
      this.selectedPoint = feature;
    } else {
      this.showPopUp = false;
    }
  }

  ngOnInit() {
    this.getDepartments();
  }

}
