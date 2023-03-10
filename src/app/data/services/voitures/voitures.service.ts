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

  /*utilisateur*/

  public getAllVoitures(): Observable<JsonModel> {
    return this.httpRequestService.get("USER", environment.apiUrl + DataWsConst.WS_VOITURES + "?etat=false");
  }

  public getAllVoituresInGarage(): Observable<JsonModel> {
    return this.httpRequestService.get("USER", environment.apiUrl + DataWsConst.WS_VOITURES + "?etat=true");
  }

  public addVoiture(voiture: any): Observable<JsonModel> {
    return this.httpRequestService.post("USER", environment.apiUrl + DataWsConst.WS_VOITURES, voiture)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  public getDevis(voiture_garage_uuid : string) {
    return this.httpRequestService.get("USER", environment.apiUrl + DataWsConst.WS_VOITURES_ADD_DEVIS + "?voiture_garage_uuid="+voiture_garage_uuid)
  }

  public depotGarage(voiture_uuid : any): Observable<JsonModel> {
    return this.httpRequestService.post("USER", environment.apiUrl + DataWsConst.WS_VOITURES_GARAGE, voiture_uuid)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  public getVoituresGarage(): Observable<JsonModel> {
    return this.httpRequestService.get("USER", environment.apiUrl + DataWsConst.WS_VOITURES_GARAGE_CLIENT);
  }

  public annulerDevis(voiture_devis_uuid : any) : Observable<JsonModel> {
    return this.httpRequestService.post("USER", environment.apiUrl + DataWsConst.WS_VOITURES_DEVIS_ANNULER, voiture_devis_uuid)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      );
  }

  public validerDevis(voiture_devis_uuid : any) : Observable<JsonModel> {
    return this.httpRequestService.post("USER", environment.apiUrl + DataWsConst.WS_VOITURES_DEVIS_VALIDER, voiture_devis_uuid)
      .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  /*responsable atelier*/

  public insertDevis(devis: any) {
    return this.httpRequestService.post("RAT", environment.apiUrl + DataWsConst.WS_VOITURES_ADD_DEVIS, devis)
      .pipe(
        tap(() => {
          this._refreshNeeded.next();
        })
      )
  }

  public getVoituresGarageD??pot(): Observable<JsonModel> {
    return this.httpRequestService.get("RAT", environment.apiUrl + DataWsConst.WS_VOITURES_GARAGE + "?avancement=D??pot");
  }
}
