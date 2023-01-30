import {DataRoutingConst} from "../../../../data/constant/data-routing.const";

export const sidebarRatData = [
  {
    routerLink: DataRoutingConst.ROUTE_RAT_DEPOT,
    icon: 'mdi mdi-home-variant',
    label: 'Depots'
  },
  {
    routerLink: DataRoutingConst.ROUTE_RAT_REP,
    icon: 'mdi mdi-settings',
    label: 'Réparations'
  },
  {
    routerLink: DataRoutingConst.ROUTE_RAT_REP_EN_COURS,
    icon: 'mdi mdi-reload',
    label: 'Réparations en cours'
  }
];
