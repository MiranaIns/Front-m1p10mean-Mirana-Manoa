import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {environment} from "../../../../environments/environment";
import {DataWsConst} from "../../constant/data-ws.const";
import {HttpRequestService} from "../../../shared/services/http/http-request.service";

@Injectable({
  providedIn: 'root'
})
export class VoitureGarageService {

  constructor(private httpRequestService: HttpRequestService) { }

  public depotGarage(voiture_uuid : any): Observable<JsonModel> {
    return this.httpRequestService.post(environment.apiUrl + DataWsConst.WS_VOITURES_GARAGE, voiture_uuid);
  }

}
