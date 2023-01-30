import { Component, OnInit } from '@angular/core';
import {VoitureGarageService} from "../../../data/services/voiture-garage/voiture-garage.service";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AjouterVoiturePopUpComponent
} from "../../../shared/components/ajouter-voiture-pop-up/ajouter-voiture-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {FaireDevisPopUpComponent} from "../../../shared/components/faire-devis-pop-up/faire-devis-pop-up.component";
import {VoituresService} from "../../../data/services/voitures/voitures.service";

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
    private voituresService : VoituresService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private voitureGarageService : VoitureGarageService
  ) { }

  ngOnInit(): void {
    this.voituresService.refreshNeeded.subscribe(() => {
      this.getVoituresGarageDépot();
    });
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
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.voitureDepot = data.voitures;
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

  showPopAjouterDevis(voiture_garage: any) {
    const dialogRef = this.matDialog.open(FaireDevisPopUpComponent, {
      data: {voiture_garage: voiture_garage },
      panelClass: "custom-container",
      autoFocus: false });
  }
}
