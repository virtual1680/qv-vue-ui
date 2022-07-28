::: warning
在案例中以下写法可以忽略,按照正常写法即可,以下代码仅仅是为了在文档中引入第三方组件

```
const ElementPlus = ref()
onMounted(() => {
	import('element-plus').then(module => {
		ElementPlus.value = module
	})
})
```

:::
