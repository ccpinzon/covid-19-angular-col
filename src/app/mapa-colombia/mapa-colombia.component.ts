import {Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {DepartmentModel} from '../models/department.model';
import {CovidApiService} from '../services/covid-api.service';
import {PlacesModel} from '../models/places.model';
import {CirclePaint, SymbolLayout, SymbolPaint} from 'mapbox-gl';
import {SharedService} from "../services/shared.service";


@Component({
  selector: 'app-mapa-colombia',
  templateUrl: './mapa-colombia.component.html',
  styleUrls: ['./mapa-colombia.component.scss']
})
export class MapaColombiaComponent implements OnInit, AfterViewInit, OnChanges {

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
  isMobile: boolean;
  locationCenter: [number, number] = [-74.50, 4];
  mapStyle ='mapbox://styles/mapbox/dark-v10';
  zoomMap = 2;

  constructor(private covidApiService: CovidApiService, private sharedService: SharedService) {
  }



  getCities() {
     this.covidApiService.getAllCities().subscribe(data => {
      this.colombianCities = data;
      this.buildGeoJsonCities();
    });
  }

   buildGeoJsonCities() {

    if (this.colombianCities && this.colombianCities.length > 0) {
      // console.log(this.colombianCities);
      this.colombianCities.forEach(colombianCity => {
        if (colombianCity && colombianCity.lat && colombianCity.lng) {
          const feature = {
            type: 'Feature',
            properties: {
              messageHtml:
                  '<div class="text-dark">\n' +
                  '    <div class="col-md-12">\n' +
                  '        <h6 align="center"> ' + colombianCity.city + '</h6>\n' +
                  '    </div>\n' +
                  '    <div class="col-md-12 alert-warning" >\n' +
                  '        <span><i class="fas fa-virus"></i><span class="d-sm-inline"> Casos: </span>' + colombianCity.cases + '  </span>\n' +
                  '    </div>\n' +
                  '    <div class="col-md-12 alert-danger">\n' +
                  '        <span><i class="fas fa-times"></i> <span class="d-sm-inline"> Muertes: </span> ' + colombianCity.deaths + '  </span>\n' +
                  '    </div>\n' +
                  '    <div class="col-md-12 alert-success">\n' +
                  '        <span><i class="fas fa-heartbeat"></i> <span class="d-sm-inline"> Recuperados: </span> ' + colombianCity.recovered + ' </span>\n' +
                  '    </div>\n' +
                  '</div>',
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
    this.isMobile = window.innerWidth < 991;
    this.sharedService.componentMethodCalled$.subscribe(() => {
      console.log("dark? -> ", this.sharedService.darkModeEnable);
      if (this.sharedService.darkModeEnable){
        this.mapStyle = 'mapbox://styles/mapbox/dark-v10';
      }else {
        this.mapStyle = 'mapbox://styles/mapbox/light-v10';
      }
    })
  }


  selectCluster($event: MouseEvent, feature) {
    console.log('selectCluster > ', feature._geometry.coordinates);
    if (feature._geometry.coordinates) {
      this.locationCenter = feature._geometry.coordinates;
      console.log(this.zoomMap);
      if (this.zoomMap <= 8) {
        this.zoomMap = 7;
        console.log('new zoom ' , this.zoomMap);
      }

    }
  }

  selectMarker($event: MouseEvent, feature) {
    // console.log('selectMarker > ', feature.properties);
    if (feature.properties.lat && feature.properties.lng) {
      this.pointSelected = feature.properties;
      this.popUpLat = feature.properties.lat;
      this.popUpLng = feature.properties.lng;
    }
  }
   ngAfterViewInit() {
    this.getCities();
  }

  moveMap() {
    if (this.colombianCities === undefined || this.colombianCities.length <= 0) {
      this.getCities();
      console.log('get cities');
    }
    if (this.pointSelected) {
      this.pointSelected = undefined;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {


  }
}
