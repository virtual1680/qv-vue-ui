# Icon 图标

<h3>Element-plus的icon</h3>
<el-icon :size="20">
    <Edit />
</el-icon>
<Share style="width: 1em; height: 1em; margin-right: 8px" />
<el-input type="text" placeholder="输入用户名" prefix-icon="User"></el-input>

<h3>qi-ui-plus常用的图标</h3>
<QiIcon color='red' class="qi-icon-duihao">Small</QiIcon>

:::demo 使用`type`，`plain`，`round`来定义 Icon 的样式

```vue
<template>
  <QiIcon class='m-20' color='red'>Small</QiIcon>
  <QiIcon type="size">Middle</QiIcon>
  <QiIcon>Large</QiIcon>
  <QiIcon disabled>Disabled</QiIcon>
</template>
<style>
  .m-20{
    margin-left:20px;
  }
</style>
```

:::