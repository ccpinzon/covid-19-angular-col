import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapColombiaService {

  mapbox = (mapboxgl as typeof mapboxgl);
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 4;
  lng = -74;
  zoom = 4.5;
  private map: mapboxgl.Map;

  casos = [
    {
      city: 'Bogotá',
      lat_lon: [-74.2, 4.6],
      cases: '1'
    },
    {
      city: 'Cali',
      lat_lon: [-76.6, 3.3],
      cases: '1'
    },
    {
      city: 'Medellin',
      lat_lon: [-75.6, 6.2],
      cases: '1'
    },
    {
      city: 'Barraquilla',
      lat_lon: [-74.8, 10.9],
      cases: '1'
    },
    {
      city: 'Tolima',
      lat_lon: [-76.4, 4.0],
      cases: '1'
    },
    {
      city: 'Risaralda',
      lat_lon: [-76.0, 5.0],
      cases: '1'
    },
    {
      city: 'Meta',
      lat_lon: [-74.1, 3.2],
      cases: '1'
    }
    ,
    {
      city: 'Santander',
      lat_lon: [-73.1, 7.1],
      cases: '1'
    },
    {
      city: 'Santander',
      lat_lon: [-75.6, 2.19],
      cases: '1'
    }
  ];

  constructor() {
    this.mapbox.accessToken = environment.accessToken;
  }

  buildMap() {
    this.mapbox.accessToken = environment.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.casos.forEach(
      function(element) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          element.city + ':' + element.cases + ' caso(s)'
        );

        const el = document.createElement('div');
        el.id = 'marker';

        const lat = element.lat_lon[0];
        const lon = element.lat_lon[1];
        console.log('coordenadas: ', lat, lon);
        console.log('this.map: ', this.map.accessToken);
        new mapboxgl.Marker(el).setLngLat([lat, lon]).setPopup(popup).addTo(this.map);
        console.log('element: ', element);
      }
    );

  }

}
