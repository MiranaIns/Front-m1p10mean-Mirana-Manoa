import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminAuthService} from "../../../data/services/admin-auth/admin-auth.service";
import {LocalStorageService} from "../../../shared/services/local-storage/local-storage.service";
import {SnackBarComponent} from "../../../shared/components/snack-bar/snack-bar.component";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {LocalStorageConst} from "../../../shared/constant/local-storage.const";
import {DataRoutingConst} from "../../../data/constant/data-routing.const";
import {DataErrorConst} from "../../../data/constant/data-error.const";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css',
    '../../../backoffice/css/vertical-layout-light/style.css',
    '../../../backoffice/vendors/css/vendor.bundle.base.css',
    '../../../backoffice/vendors/feather/feather.css',
    '../../../backoffice/vendors/ti-icons/css/themify-icons.css'
  ]
})
export class AdminLoginComponent implements OnInit {
  utilisateur_types =
    [
      {
        display_type:"Responsable atelier",
        utilisateur_type:"RAT"
      },
      {
        display_type:"Responsable financier",
        utilisateur_type:"RFI"
      },
    ]
  loginForm: FormGroup;
  theresError: boolean = false;
  error: string = "";
  utilisateurType = this.utilisateur_types[0].utilisateur_type

  constructor(
    private router : Router,
    private _snackBar: MatSnackBar,
    private adminAuthService: AdminAuthService,
    private localStorageService : LocalStorageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      utilisateur_type : new FormControl()
    });
  }

  ngOnInit(): void {

  }

  changingUtilisateurType() {
    console.log()
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

  login() {
    try {
      const userInformations = {
        'mail': this.loginForm.value.email,
        'mdp': this.loginForm.value.password,
        "utilisateurType" : this.loginForm.value.utilisateur_type
      }
      this.adminAuthService.login(userInformations).subscribe({
        next: res => {
          if(res.status > HttpStatusConst.SUCCESS ){
            this.openErrorSnackBar("Echec de la connexion. Vérifiez votre adresse e-mail et votre mot de passe.");
          }
          else {
            if(userInformations.utilisateurType==="RAT") {
              // @ts-ignore
              this.localStorageService.setItem(LocalStorageConst.ACCESS_TOKEN_RAT,res.data[0].access_token);
            }
            else if(userInformations.utilisateurType==="RFI") {
              // @ts-ignore
              this.localStorageService.setItem(LocalStorageConst.ACCESS_TOKEN_RFI,res.data[0].access_token);
            }
            this.router.navigate([DataRoutingConst.ROUTE_VOITURES]);
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
