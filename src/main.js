import './style/index.less'
import './js/index.js'
import './js/test.js'
import imgSrc from  './assets/images/xiaoqing.jpg'
let img = document.createElement('img')

img.src = imgSrc
document.body.appendChild(img)


// 判断是否开启了热更新
if(module.hot) {
  module.hot.accept(() => {
    console.log('更新失败')
  })
}