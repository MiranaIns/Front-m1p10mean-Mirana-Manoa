import { Injectable } from '@angular/core';
import {LocalStorageService} from "../../../shared/services/local-storage/local-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LocalStorageConst} from "../../../shared/constant/local-storage.const";

@Injectable({
  providedIn: 'root'
})
export class RfiAuthGuardService {
  constructor(private localStorageService : LocalStorageService) { }

  checkAuthorisation(){
    const helper = new JwtHelperService();
    const token = this.localStorageService.getItem(LocalStorageConst.ACCESS_TOKEN_RFI) != null ? this.localStorageService.getItem(LocalStorageConst.ACCESS_TOKEN_RFI) : '';
    console.log(token);
    console.log(helper.decodeToken(token));
    return !helper.isTokenExpired(token);
  }
}
