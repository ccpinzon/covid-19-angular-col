import {Component, Input, OnInit} from '@angular/core';
import {PlacesModel} from '../../models/places.model';
import {PlaceModalComponent} from '../../modal/place-modal/place-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-table-places',
  templateUrl: './table-places.component.html',
  styleUrls: ['./table-places.component.scss']
})
export class TablePlacesComponent implements OnInit {

  @Input() placesList: PlacesModel [] = [];
  @Input() showCities: boolean;
  isMobile: boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991;
  }

  openModal(dept: string) {
    let configD = {};
    console.log(this.isMobile);
    if (this.isMobile) {
      configD = {
        width: '99%',
        height: '75%',
        data: {dept} // {dept: 'bogota'}
      };
    } else {
      configD = {
        width: '1000px',
        height: '600px',
        data: {dept} // {dept: 'bogota'}
      };
    }
    // console.log(configD);
    const dialogRef = this.dialog.open(PlaceModalComponent, configD );

    dialogRef.afterClosed().subscribe(result => {
      // this.email = result;
    });
  }

}
