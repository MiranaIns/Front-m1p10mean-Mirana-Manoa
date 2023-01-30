import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-faire-devis-pop-up',
  templateUrl: './faire-devis-pop-up.component.html',
  styleUrls: ['./faire-devis-pop-up.component.css']
})
export class FaireDevisPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FaireDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.voiture_garage);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
