import { createApp } from 'vue'
import App from './src/App.vue'

// 移动端测试
// import VConsole from 'vconsole'
// new VConsole()

// 开发阶段引入
import FightingDesign from '../../packages/fighting-design/index'
import '@fighting-design/fighting-theme'

// 打包阶段引入
// import FightingDesign from '../dist'
// import '../dist/dist/index.css'

console.log(FightingDesign)

createApp(App)
  .use(FightingDesign)
  .mount('#start')