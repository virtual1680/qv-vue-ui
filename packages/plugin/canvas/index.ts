import { dataURLtoFile } from '@qv-vue/utils'
import _waterMark from './watermark'
// 标准参数
let canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null
const configDefault = {
  width: 200,
  height: 200,
}
const config = {
  text: 'qv-vueJS', // 文字
  fontFamily: 'microsoft yahei', // 字体
  color: '#999', // 颜色
  fontSize: 16, // 大小
  opacity: 100, // 透明度
  bottom: 10, // 下边位置
  right: 10, // 右边位置
  ratio: 1, // 压缩比
}

/**
 * 参数 {Object} opt
 * @param {String} text    水印文本，默认'qv-vue商用通用无敌大水印'
 * @param {String} font    水印字体，默认'30px 黑体'
 * @param {Int} canvasWidth    单个水印容器宽度，默认500
 * @param {Int} canvasHeight    单个水印容器高度，默认200
 * @param {String} textAlign    水印文本对齐方式，默认'center'
 * @param {String} textStyle    水印文本样式，默认'rgba(100,100,100,0.15)'
 * @param {Int} degree    水印文本旋转角度，默认 -20
 * @param return
 **/
export const watermark = function (opt = {}) {
  return new _waterMark(opt)
}

// 将base64转换为文件

export const detailImg = (file: any, option: any = {}) => {
  return new Promise((resolve) => {
    // 参数初始化
    function initParams() {
      config.text = text || config.text
      config.fontFamily = fontFamily || config.fontFamily
      config.color = color || config.color
      config.fontSize = fontSize || config.fontSize
      config.opacity = opacity || config.opacity
      config.bottom = bottom || config.bottom
      config.right = right || config.right
      config.ratio = ratio || config.ratio
    }

    const { text, fontFamily, color, fontSize, opacity, bottom, right, ratio } =
      option
    initParams()
    fileToBase64(file, initImg)

    // 加载图片
    function initImg(data: any) {
      const img = new Image()
      img.src = data
      img.onload = function () {
        const width = img.width
        const height = img.height
        cretedCanvas(width, height)
        ctx?.drawImage(img, 0, 0, width, height)
        setText(width, height)
        resolve(
          dataURLtoFile(
            (document.querySelector('canvas') as HTMLCanvasElement)?.toDataURL(
              file.type,
              config.ratio
            ),
            file.name
          )
        )
      }
    }
    // 创建画板
    function cretedCanvas(width: number, height: number) {
      canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (canvas === null) {
        canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.className = 'qv-vue-canvas'
        document.body.appendChild(canvas)
      }
      ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
    }
    // 添加水印
    function setText(width: number, height: number) {
      const txt = config.text
      const param = calcParam(txt, width, height)
      ctx!.font = `${config.fontSize}px${config.fontFamily}`
      ctx!.fillStyle = config.color
      ctx!.globalAlpha = config.opacity / 100
      ctx?.fillText(txt, param.x, param.y)
    }
    // 计算比例
    function calcParam(txt: any, width: number, height: number) {
      let x, y

      // 字体的比例
      const calcFontSize = config.fontSize / configDefault.width
      const fontSize = calcFontSize * width

      if (config.bottom) {
        y = configDefault.height - config.bottom
      }

      if (config.right) {
        x = configDefault.width - config.right
      }
      ctx!.font = `${config.fontSize}px${config.fontFamily}`
      const txtWidth = Number(ctx?.measureText(txt).width)

      x = x || 0 - txtWidth

      const calcPosX = x / configDefault.width
      const calcPosY = y || 0 / configDefault.height

      x = calcPosX * width
      y = calcPosY * height
      return { x, y, fontSize }
    }
    // file转base64
    function fileToBase64(file: any, callback: (result: any) => void) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e: Event) {
        const tar = e.target as EventTarget & { result: any }
        callback(tar?.['result'])
      }
    }
  })
}
