export const DataWsConst = {
  // authService
  WS_LOGIN : '/authentification/login',
  WS_INSCRIPTION : '/authentification/register',

  //voituresService
  WS_VOITURES : "/voitures",
  WS_VOITURES_ADD_DEVIS : "/voitures/devis",
  WS_VOITURES_DEVIS_ANNULER: "/voitures/devis/annuler",
  WS_VOITURES_DEVIS_VALIDER: "/voitures/devis/valider",
  WS_VOITURES_GARAGE : "/voitures/garage",
  WS_VOITURES_GARAGE_CLIENT : "/voitures/garage/client",


  //reparation service
  WS_REPARATION : "/reparations",
  WS_REPARATION_A_FAIRE : "/reparations/a-faire",
  WS_REPARATION_EN_COURS : "/reparations/en-cours",
  WS_REPARATION_COMMENCER : "/reparations/commencer",
  WS_REPARATION_TERMINER : "/reparations/terminer",

  // adminAuthService
  WS_ADMIN_LOGIN : '/admin/authentification/login'
}
