<script setup lang="ts">
defineEmits(["click"]);
withDefaults(defineProps<{ isSelected: boolean; type: string }>(), {
  isSelected: false,
  type: "action",
});
</script>
<template>
  <div
    v-if="type === 'action'"
    class="action"
    @click="$emit('click')"
    :class="{ selected: isSelected }"
  >
    <slot></slot>
  </div>
</template>
<style scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: var(--blue-button);
  border-radius: 4px;
  outline: none;
  font-family: var(--family-main);
  color: var(--white-text);
}

.selected {
  background-color: var(--white-text);
  color: var(--blue-button);
  box-shadow: 0 0 4px 2px var(--blue-button);
}
</style>
