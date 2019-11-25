<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">
        My Codes
      </div>
      <el-button type="primary" @click="go">
        To Customer Home Page
      </el-button>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  // 初始化函数
  go() {
    location.assign('../demo/demo.html')
  }
}
</script>

<style lang="scss" scoped>
.index-card {
  width: 800px;
  margin: 100px auto;
}
</style>

