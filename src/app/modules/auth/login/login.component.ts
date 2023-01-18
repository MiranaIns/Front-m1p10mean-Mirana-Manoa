import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../backoffice/css/vertical-layout-light/style.css',
    '../../../backoffice/vendors/css/vendor.bundle.base.css',
    '../../../backoffice/vendors/feather/feather.css',
    '../../../backoffice/vendors/ti-icons/css/themify-icons.css'
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  theresError: boolean = false;
  error: string = "";

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log("test");
  }

}
