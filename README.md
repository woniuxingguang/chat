#1.使用create-react-app
- 安装
`npm install -g create-react-app`
- 创建react项目
`create-react-app chat`
- 启动项目
```
cd chat/
npm start
```
- 启动个性化配置
`npm run eject`
- 访问localhost:3000
#2.安装第三方库
- yarn add redux
- yarn add react-redux
- yarn add redux-thunk
- yarn add redux-devtools-extension
- yarn add axios
- yarn add antd-mobile
- yarn add babel-plugin-import
- yarn add cookie-parser
- yarn add babel-plugin-transform-decorators-legacy


#3.Express+mongodb
#### express：
- 安装express
`yarn add express`
- 在server/server.js中开发代码
- 启动express
   - `cd server`
   - `node server.js`
   - 访问：localhost:9093即可
- nodemon 实时监听
`yarn global add nodemon`
`npm install -g nodemon`
#### mongodb
- 安装
官网下载安装
  - 新建文件夹/c/Mongdb
  - 把安装目录下的/bin下的文件复制到/c/Mongodb/
  - `cd /Mongodb`
  - `mongod --dbpath "C:\Mongodb\data"`
  - `mongo`

- mongodb + express 通过mongoose连接
`yarn add mongoose`
```
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
});
```