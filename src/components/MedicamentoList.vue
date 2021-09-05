<template>
  <ul>
    <li v-for="(item, index) in medicamentos" :key="item.id">
      <MedicamentoItem
        :value="item.id"
        :nombre="item.nombre"
        :ubicacion="item.ubicacion"
        :precio="item.precio"
        :showAddButton="showAddButton"
        :showRemoveButton="showRemoveButton"
        :index="index"
        @onClick="onClick"
        @onRemove="onRemove"
      />
    </li>
  </ul>
</template>
<script>
import MedicamentoItem from "./MedicamentoItem.vue";
export default {
  name: "MedicamentosList",
  components: {
    MedicamentoItem,
  },
  props: {
    medicamentos: Array,
    showAddButton: Boolean,
    showRemoveButton: Boolean,
  },
  emits: ["onClickItem", "onRemoveItem"],
  setup(props, { emit }) {
    const onClick = (id) => {
      emit("onClickItem", id);
    };

    const onRemove = (index) => {
      emit("onRemoveItem", index);
    };

    return {
      onClick,
      onRemove,
    };
  },
};
</script>
