import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component'
import {AuthComponent} from "./layout/components/auth/auth.component";
import {AuthGuard} from "./core/guard/auth-guard";
import {InscriptionComponent} from "./modules/auth/inscription/inscription.component";
import {AdminLoginComponent} from "./modules/auth/admin-login/admin-login.component";
import { UtilisateurTemplateComponent } from "./layout/components/utilisateur/utilisateur-template/utilisateur-template.component";
import {DataRoutingConst} from "./data/constant/data-routing.const";
import {VoituresComponent} from "./modules/utilisateur/voitures/voitures.component";
import {RatAuthGuard} from "./core/guard/rat-auth-guard";
import {
  ResponsableAtelierTemplateComponent
} from "./layout/components/responsable-atelier/responsable-atelier-template/responsable-atelier-template.component";
import {DepotsComponent} from "./modules/responsable-atelier/depots/depots.component";
import {ReparationsComponent} from "./modules/responsable-atelier/reparations/reparations.component";
import {
  ReparationsEnCoursComponent
} from "./modules/responsable-atelier/reparations-en-cours/reparations-en-cours.component";

const routes: Routes = [
  { path: '',   redirectTo: DataRoutingConst.ROUTE_LOGIN, pathMatch: 'full' },
  {
    path : 'auth',
    component : AuthComponent,
    children : [
      {
        path :'login',component : LoginComponent
      },
      {
        path :'inscription',component : InscriptionComponent
      }
    ]
  },
  {
    path : 'admin/auth',
    component : AuthComponent,
    children : [
      {
        path :'login',component : AdminLoginComponent
      }
    ]
  },
  {
    path : 'garage', component : UtilisateurTemplateComponent, canActivate : [AuthGuard],
    children : [
    	{ path: 'voitures', component:VoituresComponent}
    ]
  },
  {
    path : 'responsable-atelier', component : ResponsableAtelierTemplateComponent, canActivate : [RatAuthGuard],
    children : [
      {
        path: 'depots', component:DepotsComponent

      },
      {
        path: 'reparations', component:ReparationsComponent
      }
      ,
      {
        path: 'reparations-en-cours', component:ReparationsEnCoursComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: DataRoutingConst.ROUTE_LOGIN,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
