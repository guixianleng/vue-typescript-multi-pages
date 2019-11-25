<template>
  <svg :class="svgClass" aria-hidden="true" :style="styles">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'svg-icon'
})
export default class SvgIcon extends Vue {
  // prop
  @Prop({
    required: true,
    default: ''
  }) iconClass!: string
  @Prop({
    default: ''
  }) className!: string
  @Prop({
    default: 16
  }) size?: number | string

  // computed
  get iconName() {
    return `#icon-${this.iconClass}`
  }
  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className
    } else {
      return 'svg-icon'
    }
  }
  get styles() {
    return {
      width: this.size + 'px',
      height: this.size + 'px'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>