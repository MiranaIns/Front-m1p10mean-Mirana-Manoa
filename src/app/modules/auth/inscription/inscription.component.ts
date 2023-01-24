import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../data/services/auth/auth.service";
import {LocalStorageService} from "../../../shared/services/local-storage/local-storage.service";
import {ErrorSnackBarComponent} from "../../../shared/components/error-snack-bar/error-snack-bar.component";
import {HttpStatusConst} from "../../../shared/constant/http-status.const";
import {LocalStorageConst} from "../../../shared/constant/local-storage.const";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css',
    '../../../backoffice/css/vertical-layout-light/style.css',
    '../../../backoffice/vendors/css/vendor.bundle.base.css',
    '../../../backoffice/vendors/feather/feather.css',
    '../../../backoffice/vendors/ti-icons/css/themify-icons.css'
  ]
})
export class InscriptionComponent implements OnInit {
  loginForm: FormGroup;
  theresError: boolean = false;
  error: string = "";

  constructor(
    private router : Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private localStorageService : LocalStorageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {


  }

  openErrorSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      data : {
        message : errorMessage
      },
      duration: 2000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center',
      panelClass : 'error'
    });
  }

  login() {
    try {
      const userInformations = {
        'mail': this.loginForm.value.email,
        'mdp': this.loginForm.value.password
      }
      this.authService.login(userInformations).subscribe({
        next: res => {
          if(res.status > HttpStatusConst.SUCCESS ){
            this.openErrorSnackBar('Adresse e-mail ou mot de passe incorrect !');
          }
          else {
            // @ts-ignore
            this.localStorageService.setItem(LocalStorageConst.ACCESS_TOKEN,res.data[0].access_token);
            this.router.navigate(['/garage/accueil']);
          }
        },
        error: () => {
          this.openErrorSnackBar("Une erreur s'est produite !");
        },
        complete: () => {}
      });
    } catch (error) {
      this.openErrorSnackBar("Une erreur s'est produite !");
    }
  }
}
