<template>
  <div id="nav">
    <router-link to="/medicamentos">Medicamentos</router-link> |
    <router-link to="/promociones">Promociones</router-link> |
    <router-link to="/facturas">Facturas</router-link> |
    <router-link to="/facturas/reporte">Reporte</router-link>
  </div>
  <router-view />
</template>

<style>
#nav {
  @apply text-gray-500 text-2xl bg-gray-100 p-5;
  text-align: center;
}
.router-link-active {
  @apply text-green-500;
}
</style>
