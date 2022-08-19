/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-08-18 08:51:31
 * @LastEditTime: 2022-08-18 10:14:56
 * @Description: 暂无
 */
import { render, h } from 'vue'
import { isClient } from '@vueuse/core'
import DialogFormConstructor from './qv-dialog-form.vue'
import type { AppContext, ComponentPublicInstance } from 'vue'
import { DialogFormProps } from './qv-dialog-form.type'

const messageInstance = new Map<
	ComponentPublicInstance<{ doClose: () => void }>, // marking doClose as function
	{
		options: DialogFormProps
		resolve: (res: any) => void
		reject: (reason?: any) => void
	}
>()

const genContainer = () => {
	return document.createElement('div')
}

const initInstance = (props: any, container: HTMLElement, appContext: AppContext | null = null) => {
	const vnode = h(DialogFormConstructor, props)
	vnode.appContext = appContext
	render(vnode, container)
	document.body.appendChild(container.firstElementChild!)
	return vnode.component
}

const showDialog = (options: DialogFormProps, appContext?: AppContext | null) => {
	const container = genContainer()
	render(null, container)
	const instance = initInstance(options, container, appContext)!
	const vm = instance.proxy as ComponentPublicInstance<{ doClose: () => void }>
	messageInstance.delete(vm)
	return vm
}
async function DialogForm(options: DialogFormProps, appContext?: AppContext | null): Promise<any>

function DialogForm(options: DialogFormProps, appContext?: AppContext | null): Promise<any> {
	if (!isClient) return Promise.reject()
	return new Promise((resolve, reject) => {
		const vm = showDialog(options, appContext)
		// collect this vm in order to handle upcoming events.
		messageInstance.set(vm, {
			options,
			resolve,
			reject
		})
	})
}
export interface QvDialogForm {
	_context: AppContext | null
	/** Show a message box */
	// (message: string, title?: string, type?: string): Promise<MessageBoxData>

	/** Show a message box */
	(options: DialogFormProps, appContext?: AppContext | null): Promise<any>

	/** Close current message box */
	close(): void
}
;(DialogForm as QvDialogForm)._context = null

export default DialogForm as QvDialogForm
