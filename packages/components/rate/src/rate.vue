<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 15:30:36
 * @Description: 暂无
-->
<!-- eslint-disable vue/html-self-closing -->
<template>
	<el-rate v-model="text" :readonly="readonly" :disabled="disabled"></el-rate>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { rateProps } from './rate'
import { ElRate } from 'element-plus'

defineOptions({
	name: 'qv-rate'
})

defineEmits(['update:modelValue', 'blur', 'click', 'change', 'focus'])
defineProps(rateProps)
const text = ref(0)
</script>
