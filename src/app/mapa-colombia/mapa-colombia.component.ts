import { Component, OnInit, Input} from '@angular/core';
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
  @Input() colombianCities: PlacesModel[] = [];
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



  async getCities() {
    await this.covidApiService.getAllCities().subscribe(data => {
      this.colombianCities = data;
      this.buildGeoJsonCities();
    });
  }

  private buildGeoJsonCities() {
    if (this.colombianCities && this.colombianCities.length > 0) {
      console.log(this.colombianCities);
      this.colombianCities.forEach( colombianCity => {
        if (colombianCity && colombianCity.lat && colombianCity.lng) {
          const feature = {
            type: 'Feature',
            properties: {
              messageHtml:
                '    <div class="col-md-12">\n' +
                '        <h6 align="center"> ' + colombianCity.city + '</h6>\n' +
                '    </div>\n' +
                '    <div class="col-md-12 alert-warning" >\n' +
                '        <span><i class="fas fa-virus"></i><span class="d-sm-inline"> Casos: </span>' + colombianCity.cases + '  </span>\n' +
                '    </div>\n' +
                '    <div class="col-md-12 alert-danger">\n' +
                '        <span><i class="fas fa-times"></i> <span class="d-sm-inline"> Muertes: </span> ' +  colombianCity.deaths + '  </span>\n' +
                '    </div>\n' +
                '    <div class="col-md-12 alert-success">\n' +
                '        <span><i class="fas fa-heartbeat"></i> <span class="d-sm-inline"> Recuperados: </span> ' + colombianCity.recovered + ' </span>\n' +
                '    </div>\n',
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
