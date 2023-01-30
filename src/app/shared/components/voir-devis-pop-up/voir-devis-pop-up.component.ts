import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-voir-devis-pop-up',
  templateUrl: './voir-devis-pop-up.component.html',
  styleUrls: ['./voir-devis-pop-up.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"]
})
export class VoirDevisPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VoirDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
