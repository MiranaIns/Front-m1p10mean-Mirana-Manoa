import { Injectable } from '@angular/core';
import {HttpRequestService} from "../../../shared/services/http/http-request.service";
import {Observable, Subject, tap} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {environment} from "../../../../environments/environment";
import {DataWsConst} from "../../constant/data-ws.const";

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  constructor(private httpRequestService: HttpRequestService) { }

  private _refreshNeeded = new Subject<void> ();

  get refreshNeeded() {
    return this._refreshNeeded;
  }
  /*responsable atelier*/
  public getReparations(): Observable<JsonModel> {
    return this.httpRequestService.get("RAT", environment.apiUrl + DataWsConst.WS_REPARATION);
  }

  public getReparationsAFaire(): Observable<JsonModel> {
    return this.httpRequestService.get("RAT", environment.apiUrl + DataWsConst.WS_REPARATION_A_FAIRE);
  }


  public getReparationsEnCours(): Observable<JsonModel> {
    return this.httpRequestService.get("RAT", environment.apiUrl + DataWsConst.WS_REPARATION_EN_COURS);
  }

  public commencerReparation(voiture_reparation_uuid:any): Observable<JsonModel> {
    return this.httpRequestService.post("RAT", environment.apiUrl + DataWsConst.WS_REPARATION_COMMENCER, voiture_reparation_uuid)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }


  public terminerReparation(voiture_reparation_uuid:any): Observable<JsonModel> {
    return this.httpRequestService.post("RAT", environment.apiUrl + DataWsConst.WS_REPARATION_TERMINER, voiture_reparation_uuid)
      .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
}
