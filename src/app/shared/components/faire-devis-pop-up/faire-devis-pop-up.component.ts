import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpStatusConst} from "../../constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReparationService} from "../../../data/services/reparation/reparation.service";
import {VoitureInterface} from "../../../data/interfaces/voiture.interface";

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
  reparations : any[] = []

  constructor(
    private reparationService: ReparationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FaireDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.voiture_detail = this.data.voiture_garage.voiture_details;
    this.getReparation();
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

  private getReparation() {
    this.reparationService.getReparations().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.reparations = data.reparations;
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    console.log("HhHhHahahahaha")
  }
}
