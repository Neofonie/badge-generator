<style lang="less">
  @selector: .clrpikr;
  @{selector} {
    position: relative;

    .cp__wrapper {
      position: absolute;
      z-index: 1;
      left: 1px;
    }
  }
</style>

<template>
  <span class="clrpikr">
    <i v-bind:title="title"
       class="fas fa-palette"
       v-bind:class="{
        active: show === type,
       }"
       v-bind:style="{color: clr}"
       v-on:click="onToggle(badgeKey, type)"></i>
    <color-picker
      v-if="show === type"
      v-bind:color="clr"
      v-on:change="onChange($event, badgeKey, type)"></color-picker>
  </span>
</template>

<script>
// https://github.com/v-comp/v-color/blob/master/demo.js
import ColorPicker from '../../node_modules/v-color/dist/index.esm'

const componentName = 'ClrPikr'
export default {
  name: componentName,
  components: {
    ColorPicker
  },
  props: {
    badgeKey: {
      type: Number
    },
    title: {
      type: String,
      default: 'choose color'
    },
    type: {
      type: String
    },
    show: {
      type: String,
      default: ''
    },
    clr: {
      type: String,
      default: '#CCCCCC'
    },
    onToggle: {
      type: Function
    },
    onChange: {
      type: Function
    }
  }
}
</script>
