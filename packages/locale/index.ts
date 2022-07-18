import en from './lang/en'
import zh from './lang/zh'
export const lang = { en, zh }
export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  el: TranslatePair
}

export const t = function (path: string) {
  return eval(`lang[window.lang || 'zh'].${path}`)
}

export default { t }
