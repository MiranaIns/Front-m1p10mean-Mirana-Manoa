import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthGuardService} from "../services/auth-guard/auth-guard.service";
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from 'src/app/shared/components/error-snack-bar/error-snack-bar.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authGuardService: AuthGuardService,private router: Router,  private _snackBar: MatSnackBar,
    private localStorageService : LocalStorageService) {
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authGuardService.checkAuthorisation()){
      this.openErrorSnackBar("Vous n'êtes pas connecté(e) !");
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }

  }

}
