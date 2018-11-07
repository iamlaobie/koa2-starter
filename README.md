# koa2-starter
集成eslint、pre-commit、jest测试的快速启动开发脚手架



## 运行环境
- nodejs 10+
- pm2


## 安装
```
sudo npm install -g pm2 // 如果没有pm2工具
npm install 
```

## 配置

### 配置项目基本参数
复制配置模板文件 etc/settings.js-dist 到 etc/settings.js
根据实际情况配置

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
