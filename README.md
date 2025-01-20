<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn.makedream.site/doc/img/blog_nest_backend_logo.png" width="600px" alt="Nest Logo" /></a>
</p>

# 项目简介

使用nestjs编写的博客后端程序，系统架构如下

<p align="center">
  <img src="https://cdn.makedream.site/doc/img/blog_nest_backend_architecture.png" width="90%" alt="Nest Logo"  />
</p>

# 项目运行

由于prisma需要读取不同环境配置文件，需要额外安装dotenv-cli

```bash
$ npm install -g dotenv-cli
$ npm install
```

# 开发时运行与部署

## 开发时运行

```bash
$ npm run start:dev
```

## 开发时执行prisma迁移文件
```bash
$ npm run prisma:dev
```

## 项目部署
1. 安装dotenv读取配置文件，执行 `npm install -g dotenv-cli` ，将dotenv配置为全局命令 `ln -s /opt/nodejs/node-v20.18.1-linux-x64/bin/dotenv /usr/bin/dotenv`
2. 排除 dist、node_modules、.git、.vscode ，其他文件压缩为tar并上传
3. 在服务器上解压tar文件
4. 修改.env.production文件中的数据库用户名、密码、端口号、库名
5. 安装依赖，执行 `npm install`
6. 打包最终产物，执行 `npm run prisma:prod`
7. 导入数据到数据库(如果有存量数据)
8. 编写启动脚本 pm2start.json

    ```json
    {
      "apps": [
        {
          "name": "blog_nest_backend",
          "script": "dist/main.js",
          "autorestart": true,
          "watch": false,
          "env": {
            "NODE_ENV": "production"
          }
        }
      ]
    }
    ```

9. pm2运行，执行 `pm2 start pm2start.json`

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
