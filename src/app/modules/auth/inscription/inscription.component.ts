import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../data/services/auth/auth.service";
import {LocalStorageService} from "../../../shared/services/local-storage/local-storage.service";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {LocalStorageConst} from "../../../shared/constant/local-storage.const";
import {DataRoutingConst} from "../../../data/constant/data-routing.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css',
    '../../../template/css/vertical-layout-light/style.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css'
  ]
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  theresError: boolean = false;
  error: string = "";

  constructor(
    private router : Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private localStorageService : LocalStorageService
  ) {
    this.inscriptionForm = new FormGroup({
      nom:new FormControl(),
      prenom:new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      verifiedPassword : new FormControl()
    });
  }

  ngOnInit(): void {


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

  openSuccessSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data : {
        message : errorMessage
      },
      duration: 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center',
      panelClass : 'success'
    });
  }

  inscription() {
    try {
      const userInformations = {
        'nom':this.inscriptionForm.value.nom,
        'prenom':this.inscriptionForm.value.prenom,
        'mail': this.inscriptionForm.value.email,
        'mdp': this.inscriptionForm.value.password,
        'verified_mdp' : this.inscriptionForm.value.verifiedPassword
      }
      if(userInformations.mdp!==userInformations.verified_mdp) {
        this.openErrorSnackBar('Les mots de passe ne sont pas identiques. Veuillez vérifier et réessayer.');
      }
      else {
        this.authService.inscription(userInformations).subscribe({
          next: res => {
            if(res.status > HttpStatusConst.CREATED ){
              // @ts-ignore
              if(res.errors == 'Account already exists') {
                this.openErrorSnackBar("Vous avez déjà un compte. Veuillez vous connecter pour continuer.")
              }
              else {
                this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
              }
            }
            else {
              this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
              this.openSuccessSnackBar('Votre compte a été créé avec succès. Connectez-vous pour continuer.');
            }
          },
          error: () => {
            this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
          },
          complete: () => {}
        });
      }
    } catch (error) {
      this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
    }
  }
}
