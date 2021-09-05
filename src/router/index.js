import { createRouter, createWebHistory } from "vue-router";
import Medicamentos from "../views/Medicamento.vue";
import Promociones from "../views/Promocion.vue";
import Facturas from "../views/Factura.vue";
import FacturaAdd from "../views/FacturaAdd.vue";
import SimularFactura from "../views/SimularFactura.vue";
import MedicamentoAdd from "../views/MedicamentoAdd.vue";
import PromocionAdd from "../views/PromocionAdd.vue";
import FacturaReporte from "../views/ReporteFactura.vue";

const routes = [
  {
    path: "/medicamentos",
    name: "Medicamentos",
    component: Medicamentos,
  },
  {
    path: "/promociones/add",
    name: "PromocionAdd",
    component: PromocionAdd,
  },
  {
    path: "/promociones",
    name: "Promociones",
    component: Promociones,
  },
  {
    path: "/medicamentos/add",
    name: "MedicamentosAdd",
    component: MedicamentoAdd,
  },
  {
    path: "/facturas/simular",
    name: "SimularFactura",
    component: SimularFactura,
  },
  {
    path: "/facturas/add",
    name: "FacturaAdd",
    component: FacturaAdd,
  },
  {
    path: "/facturas",
    name: "Facturas",
    component: Facturas,
  },
  {
    path: "/facturas/reporte",
    name: "FacturaReporte",
    component: FacturaReporte,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
