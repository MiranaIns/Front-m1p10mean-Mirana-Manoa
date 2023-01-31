import { Injectable } from '@angular/core';
import {HttpRequestService} from "../../../shared/services/http/http-request.service";
import {Observable} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {environment} from "../../../../environments/environment";
import {DataWsConst} from "../../constant/data-ws.const";

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  constructor(private httpRequestService: HttpRequestService) { }

  /*responsable atelier*/
  public getReparations(): Observable<JsonModel> {
    return this.httpRequestService.get("RAT", environment.apiUrl + DataWsConst.WS_REPARATION);
  }
}
