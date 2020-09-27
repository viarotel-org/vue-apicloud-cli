# vuecli4

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Notes

## $on 和$emit 只能在同一实例相互触发

> 可以在子组件中 $parent.$emit 中发送事件 父类就可以用\$on 监听到了

## view 首字母等整体为驼峰为组件 全小写用'-'间隔则为路由

> 可以在子组件中 $parent.$emit 中发送事件 父类就可以用\$on 监听到了

## tailwind 和 ui 框架冲突的问题

> svg vertical-align: baseline;解决 Ant Design of Vue 图标文字无法垂直对齐的问题
>
> svg display: inline-block; 解决 element ui loading 组件不居中的问题
>
> button:focus outline-none 解决 ui heyui Ant Design of Vue 按钮显示黑框的问题

## Ant Design of Vue国际化提示 Warning: [antd: LocaleProvider] LocaleProvider is deprecated. Please use locale with ConfigProvider instead:问题

> 直接将<a-locale-provider>替换为<a-config-provider>，使用即可。
