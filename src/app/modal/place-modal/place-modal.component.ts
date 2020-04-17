import {Component, OnInit, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  @Input() nameDept: string;
  isMobile: boolean;

  constructor(public dialogRef: MatDialogRef<PlaceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
