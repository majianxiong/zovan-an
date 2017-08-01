<!--
              author: xx
            descript: ui base gallery
    componentFactory: 组件实例化工厂  自动实例化组件 配置信息 在 componentConfig
-->
<script>
export default {
  functional: true,
  name: 'c_factory',
  render: function (h, ctx) {
    let items = ctx.props.items
    let children = items.map(function (ele, index, array) {
      let sonEle = !ele.createSon ? '' : ele.createSon(h, ele, index, array)
      return h('li', {}, [h('h3', {}, ele.title), h('div', {class: 'ui_gallery_button', on: ele.buttonOn}, ele.txt), h(ele.name, {props: ele.props, on: ele.on, nativeOn: ele.nativeOn, 'class': ele.class, 'style': ele.style, attrs: ele.attrs, slot: ele.slot, key: ele.key, ref: ele.ref, domProps: ele.domProps, scopedSlots: ele.scopedSlots}, sonEle)])
    })
    return h('ul', {}, children)
  },
  props: {
    items: Array,
    require: true
  }
}
</script>
