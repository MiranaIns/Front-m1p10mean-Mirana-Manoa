import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthComponent } from './layout/components/auth/auth.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { InscriptionComponent } from './modules/auth/inscription/inscription.component';
import { AdminLoginComponent } from './modules/auth/admin-login/admin-login.component';
import { UtilisateurTemplateComponent } from './layout/components/utilisateur/utilisateur-template/utilisateur-template.component';
import { VoituresComponent } from './layout/components/utilisateur/voitures/voitures/voitures.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    SnackBarComponent,
    InscriptionComponent,
    AdminLoginComponent,
    UtilisateurTemplateComponent,
    VoituresComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
