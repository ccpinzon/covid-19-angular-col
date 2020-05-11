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

  geoJsonFeatures: GeoJSON.FeatureCollection;


  showPopUp = false;
  selectedPoint = null;
  popUpInfo = '';

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
              cases: colombianCity.cases
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

  showPopUpInfo(feature, show) {
    // console.log('¿show popup? ', show);
    if (show) {
      this.showPopUp = true;
      this.popUpInfo = feature.properties.message;
      this.selectedPoint = feature;
    } else {
      this.showPopUp = false;
    }
  }

  ngOnInit() {
    this.getCities();
    this.configGeoJsonInfo();
  }

  private async configGeoJsonInfo() {
    const geoJsonFeatures: { features: any[]; type: string } = this.geoJsonCities;
    setInterval(() => {
      if (geoJsonFeatures.features.length) {
        geoJsonFeatures.features.pop();
      }
      this.geoJsonFeatures = {features: undefined, type: 'FeatureCollection', ...geoJsonFeatures};
    }, 500);
  }

  selectCluster($event: MouseEvent, feature) {
    console.log(feature);
  }

  selectMarkerPoint($event: MouseEvent, feature) {
    console.log('selectAux', feature);
    // console.log('selectAux event -> ', $event);
  }
}
