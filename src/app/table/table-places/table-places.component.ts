import {Component, Input, OnInit} from '@angular/core';
import {PlacesModel} from '../../models/places.model';

@Component({
  selector: 'app-table-places',
  templateUrl: './table-places.component.html',
  styleUrls: ['./table-places.component.scss']
})
export class TablePlacesComponent implements OnInit {

  @Input() placesList: PlacesModel [] = [];
  private isMobile: boolean;
  constructor() { }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991;
  }

}
