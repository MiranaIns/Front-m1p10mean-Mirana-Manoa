import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {VoituresService} from "../../../data/services/voitures/voitures.service";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {MatDialog} from "@angular/material/dialog";
import {
  AjouterVoiturePopUpComponent
} from "../../../shared/components/ajouter-voiture-pop-up/ajouter-voiture-pop-up.component";
import {VoitureGarageService} from "../../../data/services/voiture-garage/voiture-garage.service";
import {VoirDevisPopUpComponent} from "../../../shared/components/voir-devis-pop-up/voir-devis-pop-up.component";

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css',
    "../../../template/vendors/mdi/css/materialdesignicons.min.css",
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/css/vertical-layout-light/style.css"
  ]
})
export class VoituresComponent implements OnInit {
  voitures : any[] = []
  garage : any[] = [];

  constructor(
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private voituresService: VoituresService,
    private voitureGarageService: VoitureGarageService
  ) {}

  ngOnInit() {
    this.voituresService.refreshNeeded.subscribe(() => {
      this.getAllVoitures();
    });
    this.getAllVoitures();
    this.voitureGarageService.refreshNeeded.subscribe(() => {
      this.getAllVoituresInGarage();
    });
    this.getAllVoituresInGarage();
  }

  private getAllVoitures() {
    this.voituresService.getAllVoitures().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.voitures = data.voitures;
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

  private getAllVoituresInGarage() {
    this.voitureGarageService.getVoituresGarage().subscribe({
      next: res => {
        if(res.status != HttpStatusConst.SUCCESS ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        }
        else {
          let data = res.data;
          if(data!=undefined) {
            try {
              // @ts-ignore
              this.garage = data.voitures;
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


  private depotGarage(voiture : any) {
    let voiture_uuid = {
      "voiture_uuid" : voiture.voiture_uuid
    }
    this.voitureGarageService.depotGarage(voiture_uuid).subscribe({
      next: res => {
        if(res.status != HttpStatusConst.CREATED ){
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
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

  drop(event: CdkDragDrop<any, any>) {
    // @ts-ignore
    if (event.previousContainer === event.container) {
      // @ts-ignore
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event!=undefined) {
        /*dépot voiture*/
        if(event.container.id === "liste_garage" && event.previousContainer.id === "liste_voitures") {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
          this.depotGarage(this.garage[event.currentIndex]);
        }
      }
      else {
        this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
      }
    }
  }

  showAddVoiturePopUp() {
    const dialogRef = this.matDialog.open(AjouterVoiturePopUpComponent, {
      panelClass: "custom-container",
      autoFocus: false });
  }

  showVoirDevisPopUp() {
    const dialogRef = this.matDialog.open(VoirDevisPopUpComponent, {
      panelClass: "custom-container",
      autoFocus: false });
  }
}
