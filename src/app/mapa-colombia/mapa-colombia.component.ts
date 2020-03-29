import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-colombia',
  templateUrl: './mapa-colombia.component.html',
  styleUrls: ['./mapa-colombia.component.scss']
})
export class MapaColombiaComponent implements OnInit {

  mainTittle = 'Ubicación del virus en Colombia';
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [60, 60]
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.324462890625, 4.024695711685304]
        }
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [50, 50]
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.2158203125, 7.97189158092897]
        }
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [40, 40]
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.29223632812499, 6.28151823530889]
        }
      }
    ]
  };

  alert(message: string) {
    alert(message);
  }

  constructor() {}

  ngOnInit() {
  }

}
