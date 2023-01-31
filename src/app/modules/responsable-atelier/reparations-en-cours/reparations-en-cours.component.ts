import { Component, OnInit } from '@angular/core';
import {ReparationService} from "../../../data/services/reparation/reparation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";

@Component({
  selector: 'app-reparations-en-cours',
  templateUrl: './reparations-en-cours.component.html',
  styleUrls: ['./reparations-en-cours.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"]
})
export class ReparationsEnCoursComponent implements OnInit {

  reparationEnCours:any[] = [];

  constructor(
    private reparationService : ReparationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reparationService.refreshNeeded.subscribe(() => {
      this.getReparationsEnCours();
    });
    this.getReparationsEnCours();
  }

  getReparationsEnCours() {
    this.reparationService.getReparationsEnCours().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.reparationEnCours = data.reparations;
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

  terminerReparation(reparation: any) {
    let rep = {
      voiture_reparation_uuid : reparation.voiture_reparation_uuid
    }
    this.reparationService.terminerReparation(rep).subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
      },
      error: () => {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      },
      complete: () => {}
    });
  }
}
