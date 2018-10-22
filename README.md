# 医疗系统设备消息服务
设备消息服务用来沟通业务平台与设备的消息转发服务。设备消息服务接收设备上传的数据，将数据转发给各个设备相关的平台；同时也接受平台的请求，下发指令到设备。


## 项目架构图
![架构图](http://qiniu-static.jubanr.com/misc/3.jpg)

## 运行环境
- mysql5.6+
- nodejs 10+
- pm2


## 安装
### 创建数据库
创建一个数据库his_gateway，导入创建表的sql/create_table.sql文件。

```
mysql -uuser -p his_gateway < sql/create_table.sql
```

### 安装依赖

```
sudo npm install -g pm2 // 如果没有pm2工具
npm install 
```

## 配置

### 配置项目基本参数
复制配置模板文件 etc/settings.js-dist 到 etc/settings.js
根据实际情况配置数据库连接信息：
```
module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: '*****',
    password: '****',
    database: 'his_gateway',
    multipleStatements: true,
  },
}

```

### 配置进程运行环境
复制配置模板ecosystem.config.js-dist为ecosystem.config.js，根据需要修改配置项目
```
module.exports = {
  apps: [{
    name: 'his-gateway',
    script: './index.js',
    args: '--port 9999', // 根据实际情况修改端口
    env: {
      NODE_ENV: 'production', // 开发环境下设置：development
      DEBUG: '', // 开发环境设置：*
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};

```

## 测试
测试会产生垃圾数据，请不要在生产环境执行
```
npm run test
```

## 运行

执行命令，生产环境：
```
npm start
```
开发环境：
```
npm run dev
```


## 注册设备
根据数据库的注释，添加项目、设备以及设备与项目的绑定关系

