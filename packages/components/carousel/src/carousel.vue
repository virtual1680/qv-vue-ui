<!--
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-19 15:24:46
 * @Description: 暂无
-->
<template>
	<div :class="[b(), { 'qv-carousel--fullscreen': option?.fullscreen }]">
		<el-carousel
			:type="option?.type"
			:height="option?.height + 'px'"
			:autoplay="option?.autoplay"
			:interval="option?.interval"
			indicator-position="outside">
			<el-carousel-item v-for="(item, index) in data" :key="index">
				<div :class="b('item')">
					<a :href="item.href ? item.href : 'javascript:void(0);'" :target="item.target">
						<div :class="b('img')" :style="{ backgroundImage: 'url(' + item.src + ')' }"></div>
						<div :class="b('title')" v-if="item.title">{{ item.title }}</div>
					</a>
				</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useBem } from '@qv-vue/hooks'
import { carouselProps } from './carousel'
// import { ElCarousel, ElCarouselItem } from 'element-plus'
defineOptions({
	name: 'qv-carousel'
})
const { b } = useBem('qv-carousel')

const props = defineProps(carouselProps)
const data = computed(() => {
	return props.option?.data || []
})
</script>
<style></style>
