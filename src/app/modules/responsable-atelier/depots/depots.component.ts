import { Component, OnInit } from '@angular/core';
import {VoitureGarageService} from "../../../data/services/voiture-garage/voiture-garage.service";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-depots',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"
  ]
})
export class DepotsComponent implements OnInit {
  voitureDepot: any[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private voitureGarageService : VoitureGarageService
  ) { }

  ngOnInit(): void {
    this.getVoituresGarageDépot();
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

  getVoituresGarageDépot() {
    this.voitureGarageService.getVoituresGarageDépot().subscribe({
      next: res => {
        console.log(res);
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.voitureDepot = data.voitures;
              console.log(this.voitureDepot);
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

  showPopAjouterDevis(voiture_garage_uuid: string) {
    console.log(voiture_garage_uuid);
  }
}
