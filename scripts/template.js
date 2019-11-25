/*
 * @Author: LenGxin
 * @Date: 2019-11-18 14:46:33
 * @LastEditTime: 2019-11-21 15:46:11
 * @LastEditors: LenGxin
 * @Description: 页面快速生成模板
 */

// 首字母大写
function camelName (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/**
 * 将驼峰命名转为中横杠例如：PlGroup --> pl-input-group
 * @param str 
 */
function toMiddleLine (str) {
  let temp = str.replace(/[A-Z]/g,
  function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') { //如果首字母是大写，执行replace时会多一个-，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

module.exports = {
// 页面模版
vueTemplate: viewName => {
return `<template>
  <div class="${viewName}">
    ${viewName}页面
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
// import  from '@/components/' // 组件

interface ${camelName(viewName)}Data {
  pageName: string
}

@Component({})
export default class ${camelName(viewName)} extends Vue {
  // Getter
  // @Getter ${viewName}.author
    
  // Action
  // @Action GET_DATA_ASYN

  // data
  data: ${camelName(viewName)}Data = {
    pageName: '${viewName}'
  }

  public created() {
    //
  }

  // 初始化函数
  public methodName() {
    //
  }
    
}
</script>

<style lang="scss" scoped>
@import "~assets/css/variables.scss";
.${viewName} {
  width: 100%;
}
</style>

`
},
// vuex 模版
vuexTemplate: viewName => {
return `
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ${viewName}State {
  pageName: string
}

@Module({ dynamic: true, store, name: ${viewName} })
class ${camelName(viewName)} extends VuexModule implements ${viewName}State {
  public pageName = ''

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string, value: any}) {
    this.CHANGE_SETTING(payload)
  }
}

export const ${camelName(viewName)}Module = getModule(${camelName(viewName)})

`
},
// component模板
componentTemplate: componentName => {
  return `<template>
  <div class="${toMiddleLine(componentName)}">
    {{data.componentName}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

// 定义字段类型
interface ${camelName(componentName)}Data {
  componentName: string
}

@Component({})
export default class ${camelName(componentName)} extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) name!: string

  // data
  data: ${componentName}Data = {
    componentName: '${toMiddleLine(componentName)}'
  }

  // 初始化函数
  public methodName() {
    //
  }  

}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

`
},
styleTemplate: componentName => {
return `@import "~assets/scss/variables";
.${toMiddleLine(componentName)} {}

`
}
}

// fs.mkdirSync(`${basePath}/views/${viewName}`) // mkdir

// process.chdir(`${basePath}/views/${viewName}`) // cd views
// fs.writeFileSync(`${viewName}.vue`, vueTemplate) // vue

// process.chdir(`${basePath}/types/views`); // cd types
// fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface


// process.chdir(`${basePath}/store/modules`); // cd store
// fs.writeFileSync(`${viewName}.ts`, vuexTemplate) // vuex

// process.exit(0)