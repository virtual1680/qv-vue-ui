<!-- eslint-disable vue/html-self-closing -->
<template>
  <el-rate v-model="text" :readonly="readonly" :disabled="disabled"></el-rate>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { rateProps } from './rate'
defineOptions({
  name: 'qv-rate',
})

defineEmits(['update:modelValue', 'blur', 'click', 'change', 'focus'])
defineProps(rateProps)
const text = ref(0)
</script>
