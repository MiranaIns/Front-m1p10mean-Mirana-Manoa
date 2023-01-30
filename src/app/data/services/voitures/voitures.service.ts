import { Injectable } from '@angular/core';
import {HttpRequestService} from "../../../shared/services/http/http-request.service";
import {Observable, Subject, tap} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {environment} from "../../../../environments/environment";
import {DataWsConst} from "../../constant/data-ws.const";

@Injectable({
  providedIn: 'root'
})
export class VoituresService {
  constructor(private httpRequestService: HttpRequestService) { }

  private _refreshNeeded = new Subject<void> ();

  get refreshNeeded() {
    return this._refreshNeeded;
  }

  public getAllVoitures(): Observable<JsonModel> {
    return this.httpRequestService.get(environment.apiUrl + DataWsConst.WS_VOITURES + "?etat=false");
  }

  public addVoiture(voiture: any): Observable<JsonModel> {
    return this.httpRequestService.post(environment.apiUrl + DataWsConst.WS_VOITURES, voiture)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }
}
