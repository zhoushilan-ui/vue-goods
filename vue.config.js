//在根目錄下面建立一個vue.config.js把托圖片的代理放在這裡
module.exports = {
  devServer: {
    proxy: 'http://localhost:3003' //8080默認情況下3001下面請求
  }
}
