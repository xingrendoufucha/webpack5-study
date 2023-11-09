function run() {
  console.log('跑起来了244')
}
run()

// 判断是否开启了热更新
if(module.hot) {
  module.hot.accept(() => {
    console.log('更新失败')
  })
}