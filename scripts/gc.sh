#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"
mkdir -p "$DIRNAME/__tests__"

cat > $DIRNAME/src/$INPUT_NAME.ts <<EOF

import type { EventProps } from '@qv-vue/types/qvue-ui'
import type { PropType } from 'vue'
import type ${NAME} from './${INPUT_NAME}.vue'

export const ${INPUT_NAME}Props = {
  modelValue: Object as PropType<EventProps['modelValue']>,
  dic: {
    type: Array as PropType<EventProps['dic']>,
    default: () => [],
  },
  column: {
    type: Object as PropType<EventProps['column']>,
    default: () => ({
      all: false,
    }),
  },
  size: {
    type: String as PropType<EventProps['size']>,
    default: 'small',
  },
  disabled: Boolean,
  tableData: Object as PropType<EventProps['tableData']>,
  readonly: Boolean,
  placeholder: String,
  props: {
    type: Object as PropType<EventProps['props']>,
    default: () => ({}),
  },
  propsHttp: {
    type: Object as PropType<EventProps['propsHttp']>,
    default: () => ({}),
  },
  type: {
    type: String,
  },
}
export type ${NAME}Instance = InstanceType<typeof ${NAME}>
EOF

cat > $DIRNAME/src/$INPUT_NAME.vue <<EOF
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useBem, useEvent } from '@qv-vue/hooks'
import { ${INPUT_NAME}Props } from './${INPUT_NAME}';
defineOptions({
  name: 'qv-${INPUT_NAME}',
})
const { b } = useBem('qv-${INPUT_NAME}');
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur', value: any): void
  (e: 'click', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', value: any): void
}>()
const props = defineProps(${INPUT_NAME}Props)

</script>
<style></style>
EOF

cat <<EOF >"$DIRNAME/index.ts"
import { withInstall } from '@qv-vue/utils'

import ${NAME} from './src/${INPUT_NAME}.vue'

export const Qv${NAME} = withInstall(${NAME})
export default Qv${NAME}

export * from './src/${INPUT_NAME}'
EOF

cat > $DIRNAME/__tests__/$INPUT_NAME.spec.ts <<EOF
import { mount } from '@vue/test-utils'
import $NAME from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('$NAME.vue', () => {
  test('render test', () => {
    const wrapper = mount($NAME, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
EOF
