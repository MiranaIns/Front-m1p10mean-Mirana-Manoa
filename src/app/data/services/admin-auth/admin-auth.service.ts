import { Injectable } from '@angular/core';
import {HttpRequestService} from "../../../shared/services/http/http-request.service";
import {Observable} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {environment} from "../../../../environments/environment";
import {DataWsConst} from "../../constant/data-ws.const";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(private httpRequestService: HttpRequestService) { }

  public login(user:any): Observable<JsonModel> {
    return this.httpRequestService.post(null, environment.apiUrl + DataWsConst.WS_ADMIN_LOGIN,user);
  }
}
