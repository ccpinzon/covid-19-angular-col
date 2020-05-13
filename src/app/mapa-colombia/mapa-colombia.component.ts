import { Component, OnInit} from '@angular/core';
import {DepartmentModel} from '../models/department.model';
import {CovidApiService} from '../services/covid-api.service';
import {PlacesModel} from '../models/places.model';
import {CirclePaint, SymbolLayout, SymbolPaint} from 'mapbox-gl';


@Component({
  selector: 'app-mapa-colombia',
  templateUrl: './mapa-colombia.component.html',
  styleUrls: ['./mapa-colombia.component.scss']
})
export class MapaColombiaComponent implements OnInit {

  mainTittle = 'Ubicación de covid-19 en Colombia';
  // departmentData: DepartmentModel[] = [];
  colombianCities: PlacesModel[] = [];
  geoJsonCities = {
    type: 'FeatureCollection',
    features: []
  };

  // popup
  pointSelected: any;
  popUpLng: number;
  popUpLat: number;

  constructor(private covidApiService: CovidApiService) {
  }



  getCities() {
    this.covidApiService.getAllCities().subscribe(data => {
      this.colombianCities = data;
      this.buildGeoJsonCities();
    });
  }

  private buildGeoJsonCities() {
    if (this.colombianCities && this.colombianCities.length > 0) {
      this.colombianCities.forEach( colombianCity => {
        if (colombianCity && colombianCity.lat && colombianCity.lng) {
          const feature = {
            type: 'Feature',
            properties: {
              messageHtml: '<strong>' + colombianCity.city + '</strong> <br>' + colombianCity.cases + ' casos.',
              message: colombianCity.city + ' ' + colombianCity.cases + ' casos.',
              // message: colombianCity.cases + '\n casos.',
              // iconSize: [20, 20]
              cases: colombianCity.cases,
              lat: colombianCity.lat,
              lng: colombianCity.lng,
            },
            geometry: {
              type: 'Point',
              coordinates: [colombianCity.lat, colombianCity.lng]
            }
          };
          this.geoJsonCities.features.push(feature);
        }
      });
    }
  }

  ngOnInit() {
    this.getCities();
  }


  selectCluster($event: MouseEvent, feature) {
    // console.log('selectCluster > ', feature);
  }

  selectMarker($event: MouseEvent, feature) {
    // console.log('selectMarker > ', feature.properties);
    if (feature.properties.lat && feature.properties.lng) {
      this.pointSelected = feature.properties;
      this.popUpLat = feature.properties.lat;
      this.popUpLng = feature.properties.lng;
    }
  }
}
