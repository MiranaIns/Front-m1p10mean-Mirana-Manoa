import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthGuardService} from "../services/auth-guard/auth-guard.service";
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import {DataRoutingConst} from "../../data/constant/data-routing.const";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authGuardService: AuthGuardService,private router: Router,  private _snackBar: MatSnackBar,
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
    if(!this.authGuardService.checkAuthorisation()){
      this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
      this.openErrorSnackBar("Vous devez vous connecter pour accéder à cette page.");
      return false;
    }
    else{
      return true;
    }

  }

}
