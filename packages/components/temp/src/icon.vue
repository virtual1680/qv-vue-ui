<!-- eslint-disable prettier/prettier -->
<template>
  <span class="qvue-icon" :class="{ 'qvue-icon--small': small }">
    <svg v-if="text.includes('#')" aria-hidden="true">
      <use :xlink:href="text" />
    </svg>
    <el-icon v-else-if="text.includes('el-')" :size="size" :color="color">
      <component :is="text" />
    </el-icon>
    <i v-else :class="text" />
  </span>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
defineOptions({
  name: 'qv-icon-temp',
})
defineProps({
  small: Boolean,
  color: String,
  size: {
    type: [String, Number],
    default: 32,
  },
  text: {
    type: String,
    default: '',
  },
})
</script>
