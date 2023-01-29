import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component'
import {TestComponent} from './modules/test/test.component'
import {AuthComponent} from "./layout/components/auth/auth.component";
import {AuthGuard} from "./core/guard/auth-guard";
import {InscriptionComponent} from "./modules/auth/inscription/inscription.component";
import {AdminLoginComponent} from "./modules/auth/admin-login/admin-login.component";
import { UtilisateurTemplateComponent } from "./layout/components/utilisateur/utilisateur-template/utilisateur-template.component";
import {DataRoutingConst} from "./data/constant/data-routing.const";

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
    	{ path: 'voitures', component:TestComponent}
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
