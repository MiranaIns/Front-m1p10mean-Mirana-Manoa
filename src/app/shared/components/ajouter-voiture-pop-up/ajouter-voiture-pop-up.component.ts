import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpStatusConst} from "../../constant/http-status.const";
import {LocalStorageConst} from "../../constant/local-storage.const";
import {DataRoutingConst} from "../../../data/constant/data-routing.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VoituresService} from "../../../data/services/voitures/voitures.service";

@Component({
  selector: 'app-ajouter-voiture-pop-up',
  templateUrl: './ajouter-voiture-pop-up.component.html',
  styleUrls: [
    './ajouter-voiture-pop-up.component.css',
    "../../../template/vendors/feather/feather.css",
    "../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../template/vendors/css/vendor.bundle.base.css",
    "../../../template/vendors/select2/select2.min.css",
    "../../../template/vendors/select2-bootstrap-theme/select2-bootstrap.min.css",
    "../../../template/css/vertical-layout-light/style.css"]
})
export class AjouterVoiturePopUpComponent implements OnInit {
  couleurs =
    [
      {
        display_type:"Bleu",
        valeur:"blue"
      },
      {
        display_type:"Rouge",
        valeur:"red"
      },
      {
        display_type:"Vert",
        valeur:"green"
      }
    ]

  ajouterVoitureForm: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private voituresService: VoituresService,
    public dialogRef: MatDialogRef<AjouterVoiturePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.ajouterVoitureForm = new FormGroup({
      marque: new FormControl(),
      modele: new FormControl(),
      immatriculation : new FormControl(),
      couleur : new FormControl()
    });
  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
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
  ajouterVoiture() {
    try {
      const voitureInformations = {
        'voiture_marque': this.ajouterVoitureForm.value.marque,
        'voiture_modele': this.ajouterVoitureForm.value.modele,
        "voiture_immatriculation" : this.ajouterVoitureForm.value.immatriculation,
        "voiture_couleur" : this.ajouterVoitureForm.value.couleur,
      }
      this.voituresService.addVoiture(voitureInformations).subscribe({
        next: res => {
          if(res.status != HttpStatusConst.CREATED ){
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          }
          else {
            this.onNoClick();
          }
        },
        error: () => {
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        },
        complete: () => {}
      });
    } catch (error) {
      this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
    }
  }
}
