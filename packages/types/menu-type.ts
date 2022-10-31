/*
 * @Author: virtual1680 virtual1680@gmail.com
 * @Date: 2022-07-25 20:09:33
 * @LastEditTime: 2022-10-29 14:24:32
 * @Description: 暂无
 */
export interface QvMenuOption {
	menu?: boolean
	menuPosition?: 'left' | 'center' | 'right' //center
	menuAlign?: 'left' | 'center' | 'right'
	menuWidth?: number
	menuType?: 'button' | 'icon' | 'link' | 'menu'
	menuBtnTitle?: string
	menuBtn?: boolean
	menuSpan?: number
	menuTitle?: string
	menuFixed?: boolean
}
