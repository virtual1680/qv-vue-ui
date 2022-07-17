/* eslint-disable prettier/prettier */
import {
  findByValue,
  getAsVal,
  getPasswordChar,
  strCorNum,
  validatenull,
} from '@qv-vue/utils'
import dayjs from 'dayjs'
import {
  ARRAY_LIST,
  ARRAY_VALUE_LIST,
  DATE_LIST,
  DIC_SHOW_SPLIT,
  DIC_SPLIT,
  MULTIPLE_LIST,
} from '@qv-vue/constants'
import type { QvColumn, QvOption } from '@qv-vue/types/qvue-ui'
export const details = (
  row: Record<string, unknown> = {},
  column: QvColumn,
  option: QvOption,
  dic: unknown[] = []
) => {
  let result = row[column.prop] as string | string[] | number | number[]
  const type = column.type
  const separator = column.separator
  // 深结构绑定处理
  if (column.bind) result = getAsVal(row, column.bind)
  if (validatenull(result)) {
    result = ''
  } else {
    const selectFlag = MULTIPLE_LIST.includes(column.type) && column.multiple
    const arrayFlag = ARRAY_VALUE_LIST.includes(column.type)
    if (
      (['string', 'number'].includes(column.dataType) ||
        selectFlag ||
        arrayFlag) &&
      !Array.isArray(result)
    ) {
      result = (result as string).split(separator || DIC_SPLIT)
      if (column.dataType === 'number') result = strCorNum(result)
    }
    if (ARRAY_LIST.includes(type)) {
      if (Array.isArray(result)) {
        result = result.join(separator || DIC_SHOW_SPLIT)
      } else {
        result = (result as string)
          .split(separator || DIC_SPLIT)
          .join(separator || DIC_SHOW_SPLIT)
      }
    } else if ('password' === type) {
      result = getPasswordChar(result as string, '*')
    } else if (DATE_LIST.includes(type) && column.format) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY')
      const formatValue = dayjs().format('YYYY-MM-DD')
      if (type.includes('range')) {
        result = result as string[]
        let date1 = result[0] || '',
          date2 = result[1] || ''
        if (type === 'timerange' && date1.length <= 8 && date2.length < 8) {
          date1 = `${formatValue} ${date1}`
          date2 = `${formatValue} ${date2}`
        }
        result = [
          dayjs(date1).format(format),
          dayjs(date2).format(format),
        ].join(column.separator || '~')
      } else {
        if (type === 'time' && (result as string).length <= 8) {
          result = `${formatValue} ${result}`
        }
        result = dayjs(result as string).format(format)
      }
    }
    // 字典处理
    result = findByValue(dic, result, column.props || option.props)
  }
  // 自定义格式化
  if (column.formatter && typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column)
  }
  return result
}
