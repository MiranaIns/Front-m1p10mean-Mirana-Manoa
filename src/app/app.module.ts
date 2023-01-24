import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { TestComponent } from './modules/test/test.component';
import { AuthComponent } from './layout/components/auth/auth.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { InscriptionComponent } from './modules/auth/inscription/inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    AuthComponent,
    SnackBarComponent,
    InscriptionComponent
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
