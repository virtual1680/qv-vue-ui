// const CONTAINERID = '_qv-vue_markcontainer';

import { randomId } from '@qv-vue/utils/util'
class waterMark {
  CONTAINERID: string
  isOberserve: boolean
  option: any
  styleStr = ''
  constructor(opt = {}) {
    this.CONTAINERID = randomId()
    this.drawCanvas = this.drawCanvas.bind(this)
    this.parentObserver = this.parentObserver.bind(this)
    this.Repaint = this.Repaint.bind(this)
    this.isOberserve = false
    this.init(opt)
    this.drawCanvas()
    this.parentObserver()
  }

  init(opt: any) {
    this.option = Object.assign(
      {
        width: 400,
        height: 200,
        text: 'qv-vueJS',
        fontSize: '30px',
        fontStyle: 'microsoft yahei',
        textAlign: 'center',
        color: 'rgba(100,100,100,0.15)',
        degree: -20,
      },
      opt
    )
  }

  drawCanvas() {
    this.isOberserve = true
    const divContainer = document.createElement('div')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    divContainer.id = this.CONTAINERID

    canvas.width = this.option.width
    canvas.height = this.option.height
    context!.font = `${this.option.fontSize} ${this.option.fontStyle}`
    context!.textAlign = this.option.textAlign
    context!.fillStyle = this.option.color
    context!.translate(canvas.width / 2, canvas.height / 2)
    context!.rotate((this.option.degree * Math.PI) / 180)
    context!.fillText(this.option.text, 0, 0)

    const backgroundUrl = canvas.toDataURL('image/png')
    let flag = this.option.id,
      el
    if (flag) el = document.querySelector(flag)
    this.styleStr = `
      position:${flag ? 'absolute' : 'fixed'};
      top:0;
      left:0;
      width:${flag ? `${el?.offsetWidth}px` : '100%'};
      height:${flag ? `${el?.offsetHeight}px` : '100%'};
      z-index:9999;
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${backgroundUrl}')`
    divContainer.setAttribute('style', this.styleStr)
    if (flag) {
      const el = document.querySelector(flag)
      el?.appendChild(divContainer)
    } else {
      document.body.appendChild(divContainer)
    }
    this.wmObserver(divContainer)
    this.isOberserve = false
  }

  wmObserver(divContainer: any) {
    const wmConf = { attributes: true, childList: true, characterData: true }
    const wmObserver = new MutationObserver((mo) => {
      if (!this.isOberserve) {
        const _obj: any = mo[0].target
        _obj.setAttribute('style', this.styleStr)
        _obj.setAttribute('id', this.CONTAINERID)
        wmObserver.takeRecords()
      }
    })
    wmObserver.observe(divContainer, wmConf)
  }

  parentObserver() {
    const bodyObserver = new MutationObserver(() => {
      if (!this.isOberserve) {
        const __wm = document.querySelector(`#${this.CONTAINERID}`)
        if (!__wm) {
          this.drawCanvas()
        } else if (__wm.getAttribute('style') !== this.styleStr) {
          __wm.setAttribute('style', this.styleStr)
        }
      }
    })
    bodyObserver.observe(
      document.querySelector(`#${this.CONTAINERID}`)!.parentNode!,
      { childList: true }
    )
  }

  Repaint(opt = {}) {
    this.remove()
    this.init(opt)
    this.drawCanvas()
  }

  remove() {
    this.isOberserve = true
    const _wm = document.querySelector(`#${this.CONTAINERID}`)
    _wm?.parentNode?.removeChild(_wm)
  }
}
export default waterMark
