export const getSlotName = (item: any, type = 'D', slot?: any) => {
  const result: Record<string, string> = {
    F: '-form',
    H: '-header',
    E: '-error',
    L: '-label',
    S: '-search',
    T: '-type',
    D: '',
  }
  const name = `${item.prop}${result[type]}`.toLowerCase()
  if (slot) return slot[name]
  return name
}

export const getSlotList = (
  list: string[] = [],
  slot: any,
  propList: any[]
) => {
  propList = propList.map((ele) => ele.prop)
  return Object.keys(slot).filter((ele) => {
    let result = false
    if (!propList.includes(ele)) {
      list.forEach((name: string) => {
        if (ele.includes(name.toLowerCase())) result = true
      })
    }
    return result
  })
}
