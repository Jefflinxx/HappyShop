# HappyShop

## 專案目標

建立廠商對客戶的線上購物平台，廠商可以編輯商品庫存，用戶可以在平台上註冊帳號或使用第三方建立帳號，登入後可建立個人購物清單、修改購物清單並完成下訂動作。

## 專案結構

- 在 node.js 的環境下用 express 框架開發
- 使用 ejs 模板引擎
- 使用 MongoDB Atlas 建立雲端資料庫
- Stateful Authentication

## 目前實作

- 客戶可在平台上註冊帳號
- 客戶可使用 google 第三方登入
- 客戶可查看所有商品
- 客戶可建立自己的購物清單
- 客戶可編輯、刪除購物清單

## 開啟方式
1. npm install
2. .env檔額外附上
3. node app.js

## 持續更新方向

- 客戶可執行下訂動作完成訂單
- 測試多個帳號時的購物車編輯是否會有錯誤
- 可以在相同商品上累加訂單
- 加入商家可操作的 console 介面，讓商家可編輯商品
- 串接金流 API
- 優化使用者介面

## 開發使用工具

- Visual Studio Code
- nodejs
- express
- Boostrap
- ejs
- MongoDB Atlas
- Mongoose
- Google Authentication
- Git
