import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component'
import {TestComponent} from './modules/test/test.component'
import {AuthComponent} from "./layout/components/auth/auth.component";
import {AuthGuard} from "./core/guard/auth-guard";


const routes: Routes = [
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path : 'auth',
    component : AuthComponent,
    children : [
      {
        path :'login',component : LoginComponent
      }
    ]
  },
  {
    path : 'garage', component : TestComponent, canActivate : [AuthGuard],
    children : [
    	{ path: 'accueil', component:TestComponent}
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
