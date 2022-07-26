export interface QvDialogOption {
	dialogFullscreen?: boolean
	dialogCustomClass?: string
	dialogEscape?: boolean
	dialogClickModal?: boolean
	dialogCloseBtn?: boolean
	dialogModal?: boolean
	dialogMenuPosition?: 'left' | 'center' | 'right'
	dialogTop?: string | number
	dialogType?: 'dialog' | 'drawer'
	dialogDirection?: 'rtl' | 'ltr' | 'ttb' | 'tbb'
	dialogWidth?: string | number
	dialogHeight?: string | number
	addTitle?: string
	editTitle?: string
	viewTitle?: string
}
