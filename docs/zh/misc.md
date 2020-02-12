---
sidebar: auto
---

# 杂项

## PM2

文档地址：[https://pm2.keymetrics.io/docs/usage/quick-start/](https://pm2.keymetrics.io/docs/usage/quick-start/)

### 主要命令

```bash
pm2 ls # 查看所有app
pm2 restart all # 重启所有app
pm2 restart <app-name> # 重启指定app
pm2 logs # 查看log
pm2 logs <app-name> # 查看指定app log
pm2 flush # 清空log
pm2 delete <app-name> # 删除app

pm2 start app.js --watch # 启动app.js，代码有更新自动重启app
pm2 start app.js --watch --ignore-watch="node_modules"
pm2 start app.js --name my-api # 命名app
pm2 start pm2.config.js --only api-<env> # 根据配置文件启动app, env can be `development`, `test`, `staging`, `production`
```

### 其他命令

```bash
pm2 update # 用于更新pm2之后更新内存中的pm2
```

### pm2.config.js

文档地址：[https://pm2.keymetrics.io/docs/usage/application-declaration/](https://pm2.keymetrics.io/docs/usage/application-declaration/)

```js
const envs = ['development', 'test', 'staging', 'production']
module.exports = {
  apps: [
    ...envs.map(it => ({
      name: 'api-' + it,
      instances: 0,
      script: 'index.js',
      args: [],
      cwd: './',
      exec_mode: 'cluster_mode',
      env: {
        NODE_APP_INSTANCE: '',
        NODE_ENV: it
      }
    }))
  ]
}
```

## Cronjob

[https://crontab.guru/](https://crontab.guru/)

常用格式

```bash
* * * * * node /path/to/app.js > /var/log/app.log 2>&1 # 每分钟执行一次
*/5 * * * * # 每5分钟执行一次
*/30 * * * * # 每30分钟执行一次
0 */1 * * * # 每小时执行一次
*/10 6-22 * * * # 6点到22点每10分钟执行一次
45 5 * * * # 每天5:45分执行一次
0 2 * * 1 # 每周一2:00执行一次
```

## Supervisor

[http://supervisord.org/](http://supervisord.org/)

### 常用命令

```bash
supervisorctl clear <name> # 清除指定app的log
supervisorctl clear <name> <name> # 清除指定多个app的log
supervisorctl clear all # 清除所有app的log
supervisorctl status # 查看所有app状态
supervisorctl status <name> # 查看指定app状态
supervisorctl update # 更新配置并重启app
supervisorctl restart <name> # 重启app. Note: restart does not reread config files
supervisorctl restart <gname>:* # 重启group里面的app. Note: restart does not reread config files
supervisorctl restart <name> <name> # 重启多个app
supervisorctl restart all # 重启所有app. Note: restart does not reread config files
supervisorctl start <name> # 启动指定app. 其他命令格式类似restart
supervisorctl stop <name> # 停止指定app. 其他命令格式类似restart
supervisorctl reload # 重启supervisord
```

### 示例文件

```conf
[program:xiaoke_api]
command=/opt/apps/xiaoke/api
autostart=true
autorestart=true
startretries=5
user=root
directory=/opt/apps/xiaoke/
redirect_stderr=true
stdout_logfile=/var/log/xiaoke-api.log
stdout_logfile_maxbytes=500MB
stdout_logfile_backups=3

[program:xiaoke_worker]
numprocs=2
command=/opt/apps/xiaoke/xiaoke_worker
process_name=%(program_name)s_%(process_num)02d
autostart=true
autorestart=true
startretries=5
user=root
directory=/opt/apps/xiaoke/
redirect_stderr=true
stdout_logfile=/var/log/xiaoke-worker.log
stdout_logfile_maxbytes=500MB
stdout_logfile_backups=3

[group:xiaoke_app]
programs=xiaoke_api,xiaoke_worker
```