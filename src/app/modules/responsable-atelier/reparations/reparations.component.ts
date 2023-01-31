import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReparationService} from "../../../data/services/reparation/reparation.service";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";

@Component({
  selector: 'app-reparations',
  templateUrl: './reparations.component.html',
  styleUrls: ['./reparations.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"]
})
export class ReparationsComponent implements OnInit {
  reparationAFaire:any[] = [];

  constructor(
    private reparationService : ReparationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reparationService.refreshNeeded.subscribe(() => {
      this.getReparationsAFaire();
    });
    this.getReparationsAFaire();
  }

  getReparationsAFaire() {
    this.reparationService.getReparationsAFaire().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.reparationAFaire = data.reparations;
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

  commencerReparation(reparation: any) {
   let rep = {
     voiture_reparation_uuid : reparation.voiture_reparation_uuid
   }
   this.reparationService.commencerReparation(rep).subscribe({
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
}
