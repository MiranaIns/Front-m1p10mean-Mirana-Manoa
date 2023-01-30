import { Component, OnInit } from '@angular/core';
import {sidebarData} from "./sidebar-data";
import { Location } from '@angular/common';

@Component({
  selector: 'app-utilisateur-template',
  templateUrl: './utilisateur-template.component.html',
  styleUrls: [
    './utilisateur-template.component.css',
    "../../../../template/vendors/feather/feather.css",
    "../../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../../template/vendors/css/vendor.bundle.base.css",
    "../../../../template/vendors/datatables.net-bs4/dataTables.bootstrap4.css",
    "../../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../../template/js/select.dataTables.min.css",
    "../../../../template/css/vertical-layout-light/style.css",
    "../../../../template/vendors/mdi/css/materialdesignicons.min.css"
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
