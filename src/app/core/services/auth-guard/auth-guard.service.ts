import { Injectable } from '@angular/core';
import {LocalStorageService} from "../../../shared/services/local-storage/local-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import {LocalStorageConst} from "../../../shared/constant/local-storage.const";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private localStorageService : LocalStorageService) { }

  checkAuthorisation(){
    const helper = new JwtHelperService();
    const token = this.localStorageService.getItem(LocalStorageConst.ACCESS_TOKEN) != null ? this.localStorageService.getItem(LocalStorageConst.ACCESS_TOKEN) : '';
    return !helper.isTokenExpired(token);
  }

}
