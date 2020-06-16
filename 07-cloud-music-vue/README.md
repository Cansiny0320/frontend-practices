<h1 align="center">Welcome to Clould Music 👋</h1>

## :speech_balloon:前言

通过小项目学习 Vue , 项目模仿网易云音乐移动端 UI 和其逻辑编写。

## :muscle: 项目目标

实现移动端网易云音乐大部分功能

> 项目持续完善，争取在 7 月前实现基础功能

## :eyes: 项目进度

### 最近更新

-   版本 ：V1.0.6.4
-   时间 ： 2020 年 6 月 16 日
-   更新内容 ：
    新增歌手分类列表(待完善)
    新增发现页下拉刷新功能

### 历史版本

-   版本 ：V1.0.6.3.1
-   时间 ： 2020 年 6 月 16 日
-   更新内容 ： 修复搜索建议一直出现的 bug

## 🚀 运行

```
# 安装依赖
npm install
```

```
#启动后端网易云API
node app.js
```

```
# 开启本地服务运行项目
npm run serve
```

## ⚙ 技术栈

-   Vue2.x (使用 Vue-cli 4.0 初始化项目)
-   ES6
-   SCSS
-   ESLint
-   Vant UI
-   [网易云音乐 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

## :mega: 目标功能

-   [x] 手机登录
-   [ ] 修改密码
-   [x] 发现页推荐歌单
-   [x] 发现页新歌、新碟
-   [x] 发现页轮播图
-   [ ] 我的页面歌单信息
-   [ ] 添加，删除歌单
-   [ ] 最近播放
-   [ ] 心动模式
-   [ ] 我的电台
-   [ ] 我的收藏
-   [ ] 视频页面
-   [ ] 朋友页面
-   [ ] 歌单广场
-   [ ] 更多新碟
-   [ ] 发现页面排行榜
-   [ ] 发现页面电台
-   [ ] 退出账号
-   [ ] 发现页面私人 FM
-   [x] 搜索功能
-   [ ] 搜索结果展示
-   [x] 热搜榜
-   [x] 历史记录
-   [x] 搜索建议
-   [ ] 歌手分类
-   [ ] 播放功能
-   [ ] 播放列表
-   [ ] 添加删除播放列表
-   [ ] 签到
-   [ ] 歌曲喜欢与否
-   [ ] 专辑收藏与否
-   [ ] 歌单评论
-   [ ] 专辑评论
-   [ ] 点赞、发送、删除评论专辑评论
-   [ ] 电台节目评论
-   [ ] 视频评论
-   [ ] 用户相关

## :page_with_curl: 项目布局

```js
src
 ├── api
 │   ├── config.js // 存取相关的api地址
 │   └── index.js // 请求相关的api方法
 ├── App.vue
 ├── assets
 │   ├── fonts
 │   ├── iconfonts // icon
 │   ├── images
 │   └── styles
 │       ├── reset.scss // 重置样式
 │       └── variable.scss // scss变量
 ├── common
 ├── components
 │   ├── base // 存取页面公共的小组件
 │   │   ├── Loading.vue //加载组件
 │   │   ├── MainHeader.vue // 主页面头部组件
 │   │   ├── search // 搜索页面组件
 │   │   └── user // 用户侧边栏组件
 │   ├── find // 发现页组件
 │   │   ├── NavLink.vue
 │   │   ├── NewSong.vue
 │   │   ├── Recommend.vue
 │   │   ├── Swiper.vue
 │   │   └── Title.vue
 │   └── search
 ├── main.js
 ├── router
 │   └── index.js
 ├── store // vuex
 │   ├── actions.js
 │   ├── getters.js
 │   ├── index.js
 │   ├── modules
 │   ├── mutations.js
 │   ├── mutationTypes.js
 │   └── states.js
 ├── utils
 │   └── index.js
 └── views
     ├── Login.vue //登录页面
     ├── main //主页面
     │   ├── Country.vue //云村页面
     │   ├── Find.vue //发现页页面
     │   ├── Main.vue //主页面
     │   ├── Mine.vue //我的页面
     │   └── Video.vue //视频页面
     └── search
         ├── HotSearch.vue //热搜榜页面
         ├── Search.vue //搜索主页面
         └── SearchDetail.vue //搜索详情页面
```
