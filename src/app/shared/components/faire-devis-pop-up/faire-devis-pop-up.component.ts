import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-faire-devis-pop-up',
  templateUrl: './faire-devis-pop-up.component.html',
  styleUrls: ['./faire-devis-pop-up.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"]
})
export class FaireDevisPopUpComponent implements OnInit {
  voiture_detail: any;

  constructor(
    public dialogRef: MatDialogRef<FaireDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.voiture_detail = this.data.voiture_garage.voiture_details;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    console.log("HhHhHahahahaha")
  }
}
