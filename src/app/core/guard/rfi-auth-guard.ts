import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import {RfiAuthGuardService} from "../services/rfi-auth-guard/rfi-auth-guard.service";


@Injectable({
  providedIn: 'root'
})
export class RfiAuthGuard implements CanActivate {

  constructor(private rfiAuthGuardService: RfiAuthGuardService,private router: Router,  private _snackBar: MatSnackBar,
    private localStorageService : LocalStorageService) {
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.rfiAuthGuardService.checkAuthorisation()){
      this.router.navigate(['/admin/auth/login']);
      this.openErrorSnackBar("Vous devez vous connecter pour accéder à cette page.");
      return false;
    }
    else{
      return true;
    }

  }

}
