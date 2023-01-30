import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpStatusConst} from "../../constant/http-status.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReparationService} from "../../../data/services/reparation/reparation.service";
import {FormControl, FormGroup} from "@angular/forms";
import {VoituresService} from "../../../data/services/voitures/voitures.service";

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
  reparations_devis : any[] = []
  prix_devis : number = 0;
  faireDevisForm: FormGroup;

  constructor(
    private voituresService : VoituresService,
    private reparationService: ReparationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FaireDevisPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.faireDevisForm = new FormGroup({
      description: new FormControl()
    });
  }

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

  ajouterReparation(reparation: any) {
    this.reparations_devis.push(reparation);
    this.prix_devis += reparation.reparation_prix;
  }

  deleteReparation(i : number) {
    this.prix_devis -= this.reparations_devis[i].reparation_prix;
    this.reparations_devis.splice(i, 1);
  }

  validerDevis() {
    try {
      if(this.prix_devis > 0) {
        let devis = {
          voiture_garage_uuid: this.data.voiture_garage.voiture_garage_uuid,
          voiture_devis_description: this.faireDevisForm.value.description,
          voiture_devis_reparations: [],
          voiture_devis_prix: this.prix_devis
        }
        this.reparations_devis.forEach(reparation => {
          let rep = {
            reparation_uuid:reparation.reparation_uuid,
            voiture_reparartion_prix: reparation.reparation_prix,
            voiture_reparation_prix_piece: 0,
            voiture_reparation_totale: reparation.reparation_prix
          }
          // @ts-ignore
          devis.voiture_devis_reparations.push(rep);
        });
        this.voituresService.insertDevis(devis).subscribe({
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
      }
      else {
        this.openErrorSnackBar("La somme total doit être supérieure à 0 Ar.");
      }
    } catch (error) {
      this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
    }
  }
}
