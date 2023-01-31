import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpStatusConst} from "../../constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VoituresService} from "../../../data/services/voitures/voitures.service";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

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
  devis_detail: any;
  voiture_detail: any;

  constructor(
    private _snackBar: MatSnackBar,
    private voituresService: VoituresService,
    public dialogRef: MatDialogRef<VoirDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.voiture_detail = this.data.voiture_garage.voiture_details;
    this.getDevis();
  }

  getDevis() {
    this.voituresService.getDevis(this.data.voiture_garage.voiture_garage_uuid).subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.devis_detail = data.voitures[0];
            }
            catch (e) {
              console.log(e);
              this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
            }
          }
          else {
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          }
        }
      },
      error: () => {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      },
      complete: () => {}
    })
  }


  openErrorSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data : {
        message : errorMessage
      },
      duration: 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center',
      panelClass : 'error'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeDateUTCToLocalTimezone(dateUTC: string) {
    let options = {hour12: false, hour: '2-digit', minute:'2-digit', second: '2-digit'};
    // @ts-ignore
    return new Date(dateUTC).toLocaleDateString([], options);
  }

  annulerDevis() {
    let voiture_devis_uuid = {
      voiture_devis_uuid : this.devis_detail.voiture_devis_uuid
    }
    console.log(voiture_devis_uuid);
    this.voituresService.annulerDevis(voiture_devis_uuid).subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              this.onNoClick();
            }
            catch (e) {
              console.log(e);
              this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
            }
          }
          else {
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          }
        }
      },
      error: () => {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      },
      complete: () => {}
    })
  }

  validerDevis() {
    let voiture_devis_uuid = {
      voiture_devis_uuid : this.devis_detail.voiture_devis_uuid
    }
    console.log(voiture_devis_uuid);
    this.voituresService.validerDevis(voiture_devis_uuid).subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              this.onNoClick();
            }
            catch (e) {
              console.log(e);
              this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
            }
          }
          else {
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          }
        }
      },
      error: () => {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      },
      complete: () => {}
    })
  }
}
