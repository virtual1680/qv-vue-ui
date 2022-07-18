import {
  createObj,
  detailDataType,
  findObject,
  validatenull,
} from '@qv-vue/utils'
import {
  ARRAY_LIST,
  ARRAY_VALUE_LIST,
  DATE_LIST,
  DIC_SPLIT,
  INPUT_LIST,
  KEY_COMPONENT_NAME,
  MULTIPLE_LIST,
  RANGE_LIST,
  SELECT_LIST,
} from '@qv-vue/constants'

import { t } from '@qv-vue/locale'
import { isString } from 'lodash-es'
/**
 * 计算级联属性
 */
export const calcCascader = (list: any[] = []) => {
  list.forEach((ele) => {
    const cascader = ele.cascader
    if (!validatenull(cascader)) {
      const parentProp = ele.prop
      cascader.forEach((citem: any) => {
        const column = findObject(list, citem)
        if (column === -1) return
        column.parentProp = parentProp
      })
    }
  })
  return list
}
/**
 * 计算空白列row
 */
let count = 0
export const calcCount = (ele: any, spanDefault = 12, init = false) => {
  if (init) count = 0
  const spanAll = 24
  count = count + (ele.span || spanDefault) + (ele.offset || 0)
  if (count === spanAll) {
    count = 0
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault) + (ele.offset || 0)
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count
    count = 0
  }
  return ele
}

/**
 * 初始化数据格式
 */
export const initValue = (value: any, column: any) => {
  const {
    type,
    multiple,
    dataType,
    separator = DIC_SPLIT,
    alone,
    emitPath,
    range,
  } = column
  let list = value
  if (
    (MULTIPLE_LIST.includes(type) && multiple == true) ||
    (ARRAY_VALUE_LIST.includes(type) && emitPath !== false) ||
    (RANGE_LIST.includes(type) && range == true)
  ) {
    if (!Array.isArray(list)) {
      if (validatenull(list)) {
        list = []
      } else {
        if (isString(list) && list.includes(separator)) {
          list = list.split(separator) || []
        }
        list = [list]
      }
    }
    // 数据转化
    list.forEach((ele: any, index: number) => {
      list[index] = detailDataType(ele, dataType)
    })
    if (ARRAY_LIST.includes(type) && validatenull(list) && alone) list = ['']
  } else {
    list = detailDataType(list, dataType)
  }
  return list
}

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (column: any) => {
  const type = column.type
  const range = column.searchRange
  let result = type
  if (column.searchType) return column.searchType
  if (['radio', 'checkbox', 'switch'].includes(type)) {
    result = 'select'
  } else if (DATE_LIST.includes(type)) {
    let rangeKey = 'range'
    if (range) {
      if (!type.includes(rangeKey)) {
        result = type + rangeKey
      } else {
        result = type
      }
    } else result = type.replace(rangeKey, '')
  } else if (['textarea'].includes(type)) {
    result = 'input'
  }
  return result
}

/**
 * 动态获取组件
 */
export const getComponent = (type = '', component: any) => {
  let result = type || 'input'
  if (!validatenull(component)) {
    return component
  } else if (ARRAY_LIST.includes(type)) {
    result = 'array'
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time'
  } else if (DATE_LIST.includes(type)) {
    result = 'date'
  } else if (['password', 'textarea', 'search'].includes(type)) {
    result = 'input'
  } else if (INPUT_LIST.includes(type)) {
    result = `input-${type}`
  }
  return KEY_COMPONENT_NAME + result
}

/**
 * 表格初始化值
 */

export const formInitVal = (list: any[] = []) => {
  let tableForm: Record<string, any> = {}
  list.forEach((ele: any) => {
    if (
      ARRAY_VALUE_LIST.includes(ele.type) ||
      (MULTIPLE_LIST.includes(ele.type) && ele.multiple) ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = []
    } else if (RANGE_LIST.includes(ele.type) && ele.range == true) {
      tableForm[ele.prop] = [0, 0]
    } else if (
      ['rate', 'slider', 'number'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
      tableForm[ele.prop] = undefined
    } else {
      tableForm[ele.prop] = ''
    }
    if (ele.bind) {
      tableForm = createObj(tableForm, ele.bind)
    }
    // 表单默认值设置
    if (!validatenull(ele.value)) {
      tableForm[ele.prop] = ele.value
    }
  })
  return tableForm
}

export const getPlaceholder = (column: any, type = ''): string => {
  const placeholder = column.placeholder
  const label = column.label
  if (type === 'search') {
    const searchPlaceholder = column.searchPlaceholder
    if (!validatenull(searchPlaceholder)) {
      return searchPlaceholder
    } else {
      return label
    }
  } else if (validatenull(placeholder)) {
    if (SELECT_LIST.includes(column.type)) {
      return `${t('tip.select')} ${label}`
    } else {
      return `${t('tip.input')} ${label}`
    }
  }

  return placeholder
}
