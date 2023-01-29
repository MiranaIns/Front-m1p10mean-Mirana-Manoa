import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-ajouter-voiture-pop-up',
  templateUrl: './ajouter-voiture-pop-up.component.html',
  styleUrls: ['./ajouter-voiture-pop-up.component.css']
})
export class AjouterVoiturePopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef< AjouterVoiturePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
