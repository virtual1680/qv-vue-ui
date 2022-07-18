import { computed, onMounted, ref, watch } from 'vue'
import { deepClone, findObject, validatenull } from '@qv-vue/utils'
import { loadDic, loadLocalDic, sendDic } from '@qv-vue/core/dic' // loadCascaderDic
import { DIC_PROPS } from '@qv-vue/constants/variable'
import { calcCascader } from './useDataformat'
import type { QvColumn, QvOption } from '@qv-vue/types/qvue-ui'
import type { Ref } from 'vue'

export const useInit = (option: QvOption) => {
  const DIC: Ref<Record<string, unknown>> = ref({})
  const cascaderDIC = ref({})
  const tableOption: Ref<QvOption> = ref({} as QvOption)
  const isMobile = ref(false)
  const objectOption: Ref<Record<string, QvColumn>> = ref({})

  const propOption = computed(() => {
    let result: QvColumn[] = []
    function findProp(list: QvColumn[] = []) {
      if (!Array.isArray(list)) return
      list.forEach((ele: QvColumn) => {
        if (ele.children) {
          findProp(ele.children)
        } else {
          result.push(ele)
        }
      })
    }
    findProp(tableOption.value.column || [])
    result = calcCascader(result)
    return result
  })
  const resultOption = computed(() => {
    return Object.assign(deepClone(tableOption.value), {
      column: propOption.value || [],
    })
  })
  const rowKey = computed(() => {
    return tableOption.value.rowKey || DIC_PROPS.rowKey
  })
  const formRules = computed(() => {
    const result: Record<string, unknown> = {}
    propOption.value.forEach((ele: any) => {
      if (ele.rules && ele.display !== false) result[ele.prop] = ele.rules
    })
    return result
  })
  const controlSize = computed(() => {
    return tableOption.value.size || 'default' // TODO this.$AVUE.size
  })
  const isMediumSize = computed(() => {
    return controlSize.value
  })
  const getIsMobile = () => {
    isMobile.value = window.document.body.clientWidth <= 768
  }
  const handleSetDic = (list: any, res: any = {}) => {
    Object.keys(res).forEach((ele) => {
      list[ele] = res[ele]
    })
  }
  //本地字典
  const handleLocalDic = () => {
    handleSetDic(DIC.value, loadLocalDic(resultOption.value))
  }
  // 网络字典加载
  const handleLoadDic = () => {
    loadDic(resultOption).then((res) => handleSetDic(DIC.value, res as any))
  }
  const dicInit = (type: string) => {
    if (type === 'cascader') {
      handleLoadCascaderDic()
    } else {
      handleLoadDic()
    }
  }
  //级联字典加载
  const handleLoadCascaderDic = () => {
    // loadCascaderDic(params.propOption.value, data).then((res: any) => handleSetDic(cascaderDIC.value, res));
  }
  const updateDic = (prop: string, list: any) => {
    const column = findObject(propOption.value, prop)
    if (validatenull(list) && validatenull(prop)) {
      handleLoadDic()
    } else if (validatenull(list) && !validatenull(column.dicUrl)) {
      sendDic({
        column,
      }).then((list) => {
        DIC.value[prop] = list
      })
    } else {
      DIC.value[prop] = list
    }
  }
  const init = (type?: boolean) => {
    tableOption.value = option
    getIsMobile()
    handleLocalDic()
    if (type !== false) handleLoadDic()
  }

  // objectOption = {name:{label:'xx',prop:'name'}}
  watch(
    () => propOption.value,
    (list) => {
      objectOption.value = {}
      list.forEach((ele: any) => (objectOption.value[ele.prop] = ele))
    },
    {
      deep: true,
    }
  )
  watch(
    () => option.column,
    () => {
      console.log('传进来的option有变化--------watch------', option)
      init(false)
    },
    {
      deep: true,
      immediate: true,
    }
  )
  // console.log(props.option);
  onMounted(() => {
    init()
    console.log('传进来的option有变化--------mounted------', option)
  })
  return {
    tableOption,
    DIC,
    rowKey,
    dicInit,
    updateDic,
    formRules,
    isMediumSize,
    cascaderDIC,
    isMobile,
    objectOption,
    controlSize,
    propOption,
  }
}
