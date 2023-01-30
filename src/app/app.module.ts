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
import { VoituresComponent } from './modules/utilisateur/voitures/voitures.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { AjouterVoiturePopUpComponent } from './shared/components/ajouter-voiture-pop-up/ajouter-voiture-pop-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ResponsableAtelierTemplateComponent } from './layout/components/responsable-atelier/responsable-atelier-template/responsable-atelier-template.component';
import { DepotsComponent } from './modules/responsable-atelier/depots/depots.component';
import { FaireDevisPopUpComponent } from "./shared/components/faire-devis-pop-up/faire-devis-pop-up.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    SnackBarComponent,
    InscriptionComponent,
    AdminLoginComponent,
    UtilisateurTemplateComponent,
    VoituresComponent,
    AjouterVoiturePopUpComponent,
    ResponsableAtelierTemplateComponent,
    DepotsComponent,
    FaireDevisPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
