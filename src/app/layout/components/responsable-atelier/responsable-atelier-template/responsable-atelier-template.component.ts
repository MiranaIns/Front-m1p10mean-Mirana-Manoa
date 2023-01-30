import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {sidebarRatData} from "./sidebar-rat-data";

@Component({
  selector: 'app-responsable-atelier-template',
  templateUrl: './responsable-atelier-template.component.html',
  styleUrls: ['./responsable-atelier-template.component.css',
    "../../../../template/vendors/feather/feather.css",
    "../../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../../template/vendors/css/vendor.bundle.base.css",
    "../../../../template/vendors/datatables.net-bs4/dataTables.bootstrap4.css",
    "../../../../template/vendors/ti-icons/css/themify-icons.css",
    "../../../../template/js/select.dataTables.min.css",
    "../../../../template/css/vertical-layout-light/style.css",
    "../../../../template/vendors/mdi/css/materialdesignicons.min.css"]
})
export class ResponsableAtelierTemplateComponent implements OnInit {
  sidebarData = sidebarRatData;
  currentPath: string;

  constructor(private location: Location) {
    this.currentPath = this.location.path();
  }

  ngOnInit(): void {
  }
}
