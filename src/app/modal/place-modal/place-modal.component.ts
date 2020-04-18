import {Component, OnInit, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CovidApiService} from '../../services/covid-api.service';
import {PlacesModel} from '../../models/places.model';

interface DialogData {
  email: string;
  dept: string;
}

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.scss']
})
export class PlaceModalComponent implements OnInit {

  isMobile: boolean;
  placeModelList: PlacesModel[] = [];

  constructor(public dialogRef: MatDialogRef<PlaceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private covidApiService: CovidApiService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991;
    this.getCitiesFromDep(this.data.dept);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getCitiesFromDep(nameDept: string) {
    // console.log(nameDept);
    this.covidApiService.getCitiesFromDepData(nameDept).subscribe(res => {
      this.placeModelList = res;
      // console.log(res);
    });
  }

}
