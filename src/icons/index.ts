import Vue from 'vue'
import SvgIcon from '@/components/global/SvgIcon.vue'

// 全局注册
Vue.component('svg-icon', SvgIcon)

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
