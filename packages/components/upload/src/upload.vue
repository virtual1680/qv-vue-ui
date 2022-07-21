<template>
	<div v-loading.lock="loading" :class="{ 'qv-upload': column.listType === 'picture-img', upload: column.listType === 'picture-card' }">
		<!-- listType 警告问题 -->
		<el-upload
			:key="reload"
			:class="{ list: column.listType === 'picture-img', upload: disabled }"
			:action="column.action"
			:on-remove="handleRemove"
			:accept="acceptList"
			:before-remove="beforeRemove"
			:multiple="column.multiple"
			:on-preview="handlePreview"
			:limit="column.limit"
			:http-request="httpUpload"
			:drag="column.dragFile"
			:readonly="readonly"
			:show-file-list="isPictureImg ? false : column?.showFileList"
			:list-type="column?.listType"
			:on-change="handleFileChange"
			:on-exceed="handleExceed"
			:disabled="disabled"
			:file-list="fileList"
			@click="handleClick">
			<template v-if="column.listType == 'picture-card'">
				<el-icon>
					<Plus />
				</el-icon>
			</template>
			<template v-else-if="column?.listType == 'picture-img'">
				<slot v-if="slots.default" :file="{ url: imgUrl }" />
				<template v-else>
					<component :is="getIsVideo(imgUrl)" v-if="imgUrl" :src="imgUrl" :class="b('avatar')" @mouseover="menu = true" />
					<el-icon v-else :class="b('icon')">
						<Plus />
					</el-icon>
					<div
						v-if="menu"
						class="el-upload-list__item-actions"
						:class="b('menu')"
						@mouseover="menu = true"
						@mouseout="menu = false"
						@click.stop="
							() => {
								return false
							}
						">
						<el-icon @click.stop="handlePreview({ url: imgUrl })">
							<ZoomIn />
						</el-icon>
						<el-icon v-if="!disabled" @click.stop="handleDelete(imgUrl)">
							<Delete />
						</el-icon>
					</div>
				</template>
			</template>
			<template v-else-if="column?.dragFile">
				<el-icon>
					<Upload />
				</el-icon>
				<div class="el-upload__text">
					{{ t('upload.tip') }}
					<em>{{ t('upload.upload') }}</em>
				</div>
			</template>
			<template v-else>
				<el-button size="small" type="primary">{{ t('upload.upload') }}</el-button>
			</template>
			<template #tip>
				<div class="el-upload__tip" v-html="column?.tip" />
			</template>
			<template #file="{ file }">
				<slot v-if="slots.default" :file="file" />
				<span v-else-if="column?.listType === 'picture-card'">
					<component :is="file.type" class="el-upload-list__item-thumbnail" :src="file.url" />
					<span class="el-upload-list__item-actions">
						<span class="el-upload-list__item-preview">
							<el-icon>
								<ZoomIn @click.stop="handlePreview(file)" />
							</el-icon>
						</span>
						<span class="el-upload-list__item-delete">
							<el-icon>
								<Delete @click.stop="handleRemove(file)" />
							</el-icon>
						</span>
					</span>
				</span>
				<span v-else-if="column?.listType === 'picture'" @click.stop="handlePreview(file)">
					<component :is="file.type" class="el-upload-list__item-thumbnail" :src="file.url" />
					<a class="el-upload-list__item-name">
						<el-icon>
							<Document />
						</el-icon>
						<span class="el-upload-list__item-file-name"> {{ file.name }}</span>
					</a>
					<el-icon class="el-icon--close">
						<Close @click.stop="handleRemove(file)" />
					</el-icon>
				</span>
				<span v-else @click.stop="handlePreview(file)">
					<div class="el-upload-list__item-info">
						<a class="el-upload-list__item-name">
							<el-icon>
								<Document />
							</el-icon>
							<span class="el-upload-list__item-file-name">
								{{ file.name }}
							</span>
						</a>
						<el-icon class="el-icon--close">
							<Close @click.stop="handleRemove(file)" />
						</el-icon>
					</div>
				</span>
			</template>
		</el-upload>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, useSlots, getCurrentInstance } from 'vue'
import { useBem, useEvent } from '@qv-vue/hooks'
import { t } from '@qv-vue/locale'
import { typeList } from '@qv-vue/constants'
// import { detailImg, getClient } from '@qv-vue/plugin'
import { getAsVal, validatenull } from '@qv-vue/utils'
import { uploadProps } from './upload'
import type { Ref } from 'vue'
defineOptions({
	name: 'qv-upload'
})
const { b } = useBem('qv-upload')
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'blur', value: any): void
	(e: 'click', value: any): void
	(e: 'change', value: any): void
	(e: 'focus', value: any): void
}>()
const slots = useSlots()

function getFileUrl(home: string, uri = '') {
	return uri.match(/(^http:\/\/|^https:\/\/|^\/\/|data:image\/)/) ? uri : home + uri
}
const props = defineProps(uploadProps)
const { text, labelKey, valueKey, urlKey, resKey, nameKey, handleClick, isArray, isString, stringMode, handleChange } = useEvent(props, emit)
console.log(props)

const menu = ref(false)
const reload = ref(Math.random())
const res: Ref<any> = ref('')
const loading = ref(false)
const file: Ref<any> = ref({})
const instance = getCurrentInstance()

const isMultiple = computed(() => {
	return isArray.value || isString.value || stringMode.value
})
const acceptList = computed(() => {
	if (Array.isArray(props.column?.accept)) {
		return props.column?.accept?.join(',')
	}
	return props.column?.accept
})
const homeUrl = computed(() => {
	return props.column?.propsHttp?.home || ''
})
const fileName = computed(() => {
	return props.column?.propsHttp?.fileName || 'file'
})
const isAliOss = computed(() => {
	return props.column?.oss === 'ali'
})
// const isQiniuOss = computed(() => {
// 	return props.column?.oss === 'qiniu'
// })
const isPictureImg = computed(() => {
	return props.column?.listType === 'picture-img'
})
//单个头像图片
const imgUrl = computed(() => {
	if (!validatenull(text.value)) {
		return getFileUrl(homeUrl.value, text.value[0])
	}
	return ''
})
const fileList = computed(() => {
	const list: any[] = []
	;(text.value || []).forEach((ele: any, index: number) => {
		if (ele) {
			let name
			//处理单个url链接取最后为label
			if (isMultiple.value) {
				const i = ele.lastIndexOf('/')
				name = ele.slice(i + 1)
			}
			const url = getFileUrl(homeUrl.value, isMultiple.value ? ele : ele[valueKey.value])
			list.push({
				uid: index,
				status: 'done',
				type: getIsVideo(url),
				isImage: ele.isImage,
				name: isMultiple.value ? name : ele[labelKey.value],
				url
			})
		}
	})
	return list
})
const getIsVideo = (url: any) => {
	if (typeList.video.test(url)) {
		return 'video'
	}
	return 'img'
}
const setSort = () => {
	// if (!window['Sortable']) {
	//   packages.logs('Sortable')
	//   return
	// }
	// const el =
	//   getCurrentInstance()?.proxy?.$el.querySelectorAll('.qv-upload > ul')[0]
	// window['Sortable'].create(el, {
	//   animation: 100,
	//   onEnd: (evt: any) => {
	//     const targetRow = text.value.splice(evt.oldIndex, 1)[0]
	//     text.value.splice(evt.newIndex, 0, targetRow)
	//     reload.value = Math.random()
	//     nextTick(() => setSort())
	//   },
	// })
}
const handleSuccess = (file: any) => {
	if (isPictureImg.value) {
		text.value.splice(0, 1, file[urlKey.value])
		handleChange(text.value)
	} else if (isMultiple.value) {
		text.value.push(file[urlKey.value])
	} else {
		const obj: Record<string, unknown> = {}
		obj[labelKey.value] = file[nameKey.value]
		obj[valueKey.value] = file[urlKey.value]
		text.value.push(obj)
	}
}
const handleRemove = (file: any, fileList?: any) => {
	props.column?.onRemove?.(file, fileList)
	deleteImg(file)
}
const handleError = (error: any) => {
	props.column?.uploadError?.(error, props.column)
}
const deleteImg = (file: any) => {
	;(text.value || []).forEach((ele: any, index: number) => {
		if ((isMultiple.value ? ele : ele[valueKey.value]) === file.url.replace(homeUrl.value, '')) {
			text.value.splice(index, 1)
		}
	})
}
const show = (data: any) => {
	loading.value = false
	handleSuccess(data || res.value)
}
const hide = (msg?: any) => {
	loading.value = false
	handleError(msg)
}
const handleFileChange = (file: any, fileList: any[]) => {
	const index = fileList.length - 1
	fileList.splice(index, 1)
}
const httpUpload = (config: any) => {
	if (typeof props.column?.httpRequest === 'function') {
		props.column?.httpRequest(config)
		return
	}
	loading.value = true
	file.value = config.file
	const fileSize = file.value.size / 1024
	if (!validatenull(fileSize) && fileSize > (props.column?.fileSize || 1024)) {
		hide('文件太大不符合')
		return
	}
	const headers = Object.assign(props.column?.headers || {}, {
		'Content-Type': 'multipart/form-data'
	})
	//oss配置属性
	// const ossConfig: any = {}
	let client: any = {}
	const param = new FormData()
	const done = () => {
		const callback = (newFile?: any) => {
			const url = props.column?.action
			//附加属性
			for (const o in props.column?.data) {
				param.append(o, props.column?.data[o] || '')
			}
			const uploadfile = newFile || file
			param.append(fileName.value, uploadfile)
			if (isAliOss.value) {
				// if (!window['OSS']) {
				//   packages.logs('AliOSS')
				//   hide()
				//   return
				// }
				// ossConfig = {} //this.$AVUE.ali
				// client = getClient(ossConfig)
			}
			;(() => {
				if (isAliOss.value) {
					return client.put(uploadfile.name, uploadfile, {
						headers: props.column?.headers
					})
				} else {
					console.log(url, headers)
					return instance?.appContext.config.globalProperties.$axios.post(url, param, { headers })
				}
			})()
				.then((result: any) => {
					res.value = {}
					if (isAliOss.value) {
						res.value = getAsVal(result, resKey.value)
					} else {
						res.value = getAsVal(result.data, resKey.value)
					}
					if (typeof props.column?.uploadAfter === 'function')
						props.column?.uploadAfter(
							res.value,
							show,
							() => {
								loading.value = false
							},
							props.column
						)
					else show(res.value)
				})
				.catch((error: any) => {
					if (typeof props.column?.uploadAfter === 'function')
						props.column?.uploadAfter(
							error,
							hide,
							() => {
								loading.value = false
							},
							props.column
						)
					else hide(error)
				})
		}
		if (typeof props.column?.uploadBefore === 'function')
			props.column?.uploadBefore(
				file.value,
				callback,
				() => {
					loading.value = false
				},
				props.column
			)
		else callback()
	}
	//是否开启水印
	if (!validatenull(props.column?.canvasOption)) {
		// detailImg(file, props.column?.canvasOption).then((res) => {
		//   file.value = res
		//   done()
		// })
	} else {
		done()
	}
}
const handleExceed = (files: any, fileList: any[]) => {
	props.column?.uploadExceed && props.column?.uploadExceed(props.column?.limit || 1, files, fileList, props.column)
}
const handlePreview = (file: any) => {
	const callback = () => {
		const index = fileList.value.findIndex(ele => {
			return ele.url === file.url
		})
		console.log(index)
		// this.$ImagePreview(fileList.value, index);
	}
	if (typeof props.column?.uploadPreview === 'function') {
		props.column?.uploadPreview(file, props.column, callback)
	} else {
		callback()
	}
}
const beforeRemove = (file: any) => {
	if (typeof props.column?.uploadDelete === 'function') {
		return props.column?.uploadDelete(file, props.column)
	} else {
		return Promise.resolve()
	}
}
const handleDelete = (file: any) => {
	beforeRemove(file).then(() => {
		text.value = []
		menu.value = false
	})
	// .catch(() => {})
}

onMounted(() => {
	if (props.column?.drag) {
		setSort()
	}
})
</script>
<style></style>
