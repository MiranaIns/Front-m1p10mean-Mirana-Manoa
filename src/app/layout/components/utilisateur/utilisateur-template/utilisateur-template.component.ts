import { Component, OnInit } from '@angular/core';
import {sidebarData} from "./sidebar-data";
import { Location } from '@angular/common';

@Component({
  selector: 'app-utilisateur-template',
  templateUrl: './utilisateur-template.component.html',
  styleUrls: [
    './utilisateur-template.component.css',
    "../../../../backoffice/vendors/feather/feather.css",
    "../../../../backoffice/vendors/ti-icons/css/themify-icons.css",
    "../../../../backoffice/vendors/css/vendor.bundle.base.css",
    "../../../../backoffice/vendors/datatables.net-bs4/dataTables.bootstrap4.css",
    "../../../../backoffice/vendors/ti-icons/css/themify-icons.css",
    "../../../../backoffice/js/select.dataTables.min.css",
    "../../../../backoffice/css/vertical-layout-light/style.css",
    "../../../../backoffice/vendors/mdi/css/materialdesignicons.min.css"
  ]
})
export class UtilisateurTemplateComponent implements OnInit {
  sidebarData = sidebarData;
  currentPath: string;

  constructor(private location: Location) {
    this.currentPath = this.location.path();
  }

  ngOnInit(): void {
  }

}
