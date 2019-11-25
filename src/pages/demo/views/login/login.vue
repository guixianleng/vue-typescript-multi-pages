<template>
  <div class="login">
    <el-card class="login-card">
      <div slot="header">
        <span class="logo-text">Management System</span>
      </div>
      <el-form class="login" label-width="100px" >
        <el-form-item label="Phone">
          <el-input
            placeholder="Please enter phone number"
            v-model.number="ruleForm.phone"
            type="tel" 
            :maxlength="11" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            placeholder="Please enter password"
            v-model="ruleForm.password"
            type="password"
            @keyup.enter="login" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

export interface LoginForm {
  phone: number,
  password: string
}

@Component({})
export default class Login extends Vue {
  ruleForm: LoginForm = {
    phone: 15216161616,
    password: '123456'
  }
  // 初始化函数
  login() {
    console.log('登录')
  }
    
}
</script>

<style lang="scss" scoped>
@import "~assets/css/variables.scss";
.login {
  width: 100%;
  &-card {
    width: 500px;
    margin: 0 auto
  }
}
</style>

