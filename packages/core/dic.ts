/* eslint-disable prettier/prettier */
import { detailDic, getObjValue, validatenull } from '@qv-vue/utils'
export const loadCascaderDic = (columnOption: any[], list: any[]) => {
  return new Promise((resolve) => {
    const columnList: any[] = []
    const result: any[] = []
    const networkdic: Record<string, unknown> = {}
    columnOption.forEach((ele) => ele.parentProp && columnList.push(ele))
    list.forEach((ele: { [x: string]: any }, index: any) => {
      columnList.forEach((column) => {
        if (column.hide !== true && column.dicFlag !== false) {
          result.push(
            new Promise((resolve) => {
              if (validatenull(ele[column.parentProp])) {
                resolve({
                  prop: column.prop,
                  data: [],
                  index,
                })
              } else {
                if (column.dicUrl) {
                  sendDic(
                    Object.assign(
                      {
                        url: `${column.dicUrl.replace(
                          '{{key}}',
                          ele[column.parentProp]
                        )}`,
                      },
                      {
                        props: column.props,
                        method: column.dicMethod,
                        formatter: column.dicFormatter,
                        query: column.dicQuery,
                      }
                    )
                  ).then((res) => {
                    resolve({
                      prop: column.prop,
                      data: res,
                      index,
                    })
                  })
                }
              }
            })
          )
        }
      })
    })
    Promise.all(result).then((data) => {
      data.forEach((ele) => {
        if (validatenull(networkdic[ele.index])) networkdic[ele.index] = {}
        const obj: any = networkdic[ele.index]
        obj[ele.prop] = ele.data
      })
      resolve(networkdic)
    })
  })
}
export const loadDic = (option: any) => {
  let ajaxdic = createdDic(option)
  return new Promise((resolve, reject) => {
    handleDic(ajaxdic)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const loadLocalDic = (option: {
  dicData: Record<string, unknown>
  column: any[]
}) => {
  const locationdic: Record<string, unknown> = {}
  const alldic = option.dicData || {}
  option.column.forEach(
    (ele: {
      dicData: any[] | undefined
      prop: string | number
      props: any
      dataType: string
    }) => {
      if (ele.dicData)
        locationdic[ele.prop] = detailDic(ele.dicData, ele.props, ele.dataType)
    }
  )
  return Object.assign(alldic, locationdic)
}
function createdDic(option: { column: never[] }) {
  const column = option.column || []
  const ajaxdic: {
    url: any
    name: any
    method: any
    formatter: any
    props: any
    dataType: any
    resKey: any
    query: any
  }[] = []
  let flagdic: any[] = []
  column.forEach(
    (ele: {
      dicUrl: any
      prop: any
      parentProp: any
      cascader: any
      dicFlag: boolean
      lazy: boolean
      dicMethod: any
      dicFormatter: any
      props: any
      dataType: any
      dicQuery: any
    }) => {
      const dicUrl = ele.dicUrl
      const prop = ele.prop
      const parentProp = ele.parentProp
      flagdic = flagdic.concat(ele.cascader || [])
      const result =
        ele.dicFlag === false || ele.lazy === true || flagdic.includes(prop)
      if (result) return
      if (dicUrl && !parentProp) {
        ajaxdic.push({
          url: dicUrl,
          name: prop,
          method: ele.dicMethod,
          formatter: ele.dicFormatter,
          props: ele.props,
          dataType: ele.dataType,
          resKey: (ele.props || {}).res,
          query: ele.dicQuery || {},
        })
      }
    }
  )
  return ajaxdic
}

// 循环处理字典
function handleDic(list: any[]) {
  const networkdic: Record<string, unknown> = {}
  const result: any[] = []
  return new Promise((resolve) => {
    list.forEach((ele: { url: string; props: any; dataType: string }) => {
      result.push(
        new Promise((resolve) => {
          sendDic(
            Object.assign(ele, {
              url: `${ele.url.replace('{{key}}', '')}`,
            })
          )
            .then((res: any) => {
              res = detailDic(res, ele.props, ele.dataType)
              resolve(res)
            })
            .catch(() => {
              resolve([])
            })
        })
      )
    })
    Promise.all(result).then((data: unknown[]) => {
      list.forEach((ele: { name: string | number }, index: number) => {
        networkdic[ele.name] = data[index]
      })
      resolve(networkdic)
    })
  })
}
// { url: string } & { props: any; method: any; formatter: any; query: any }
// ajax获取字典
export const sendDic = (params: any) => {
  let {
    url,
    query,
    method,
    resKey,
    props,
    formatter,
    value = '',
    column,
    form = {},
  } = params
  if (column) {
    url = column.dicUrl
    method = column.dicMethod
    query = column.dicQuery || {}
    formatter = column.dicFormatter
    props = column.props
  }
  const key = 'key'
  url = url || ''
  let list = []
  const data: Record<string, unknown> = {}
  list = url.match(/[^\{\}]+(?=\})/g) || []
  list.forEach((ele: string) => {
    const eleKey = `{{${ele}}}`
    const eleValue = form[ele]
    if (ele === key) url = url.replace(eleKey, value)
    else url = url.replace(eleKey, eleValue)
  })
  if (method === 'post') {
    list = Object.keys(query)
    list.forEach((ele) => {
      const eleKey = query[ele]
      if (typeof eleKey == 'string') {
        if (eleKey.match(/\{{|}}/g)) {
          const eleValue = form[eleKey.replace(/\{{|}}/g, '')]
          data[ele] = eleValue
        } else {
          data[ele] = eleKey
        }
      } else {
        data[ele] = eleKey
      }
    })
  }

  if (props) resKey = (props || {}).res || resKey
  return new Promise((resolve) => {
    const callback = (res: { data: any }) => {
      let list = []
      if (typeof formatter === 'function') {
        list = formatter(res.data)
      } else {
        list = getObjValue(res.data, resKey)
      }
      resolve(list)
    }
    if (method === 'post') {
      console.log(callback)

      // window as any['axios']
      //   .post(url, data)
      //   .then(function (res: any) {
      //     callback(res)
      //   })
      //   .catch(() => [resolve([])])
    } else {
      // window['axios']
      //   .get(url, {
      //     params: query,
      //   })
      //   .then(function (res: any) {
      //     callback(res)
      //   })
      //   .catch(() => [resolve([])])
    }
  })
}
