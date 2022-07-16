// import en from './lang/en'
// import zh from './lang/zh'

export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair
}

export type Language = {
  name: string
  el: TranslatePair
}

export const t = function (path: string) {
  return path
}

export default { t }
