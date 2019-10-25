---
sidebar: auto
---

# Nginx

## 安装

### MacOS

```bash
brew install nginx
```

重启命令: `brew services restart nginx`

### Amazon Linux

```bash
yum install -y nginx

service nginx restart
chkconfig nginx on # reboot服务器后会自动启动
```

## 配置

配置路径是 `/etc/nginx`。基本配置都在 `/etc/nginx/nginx.conf` 里面。站点的配置文件都放 `/etc/nginx/conf.d` 目录下。

### 基本配置

```nginx
gzip on;
gzip_types text/plain text/xml text/css text/javascript application/javascript application/json;
client_max_body_size 100M;
```

#### Access log过滤

`access_log` 过滤资源文件访问记录加入以下配置(嵌套在 `server { ... }` 里面):

```nginx
    location ~* ^.+.(jpg|jpeg|gif|css|png|js|ico)$ {
        access_log  off;
    }

    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }
```

#### Https强制跳转

```nginx
    if ($http_x_forwarded_proto != "https") {
          rewrite ^(.*)$ https://$server_name$REQUEST_URI permanent;
    }
```

或者

```nginx
server {
    listen 	 80;
    server_name  www.codedocs.io codedocs.io;

    return 301 https://www.codedocs.io$request_uri;
}
```

#### Https配置

```nginx
server {
    listen 443 ssl;
    server_name api.codedocs.io;

    ssl_certificate /etc/nginx/cert/codedocs_io.pem;
    ssl_certificate_key /etc/nginx/cert/codedocs_io.key;
}
```

### 纯静态网站配置

`/etc/nginx/conf.d` 新增 `codedocs-web.conf` 文件保存以下内容。重启 `nginx`。

::: tip 提示
`server_name` 可以指定多个域名，如:

```nginx
server_name  www.codedocs.io www2.codedocs.io www3.codedocs.io;
```
:::

```nginx
server {
    listen       80;
    server_name  www.codedocs.io;
    root	 /var/www/codedocs-web;

    location / {
        index  index.html;
    }

    access_log   /var/log/nginx/codedocs_api_access.log main buffer=32k flush=5s;
    error_log    /var/log/nginx/codedocs_api_error.log;
}

server {
    listen 	 80;
    server_name  codedocs.io;

    return 301 https://www.codedocs.io$request_uri;
}
```

### SPA网站配置

```nginx
server {
    listen       80;
    server_name  admin.codedocs.io;
    root         /var/www/codedocs-admin;

    index index.html;
    
    location / {
      try_files $uri $uri/ @rewrites;
    }

    location @rewrites {
      rewrite ^(.+)$ /index.html last;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
      expires max;
      add_header Pragma public;
      add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }
}
```

### PHP网站配置

```nginx
server {
    listen 80;
    server_name api.codedocs.io;

    root /var/www/codedocs-api;
    index index.php;

    keepalive_timeout 70;

    if (!-e \$request_filename){
        rewrite ^/(.*) /index.php last;
    }

    location ~ \.(json)\$ {
        add_header Access-Control-Allow-Origin *;
    }

    location ~ \.php\$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
        proxy_read_timeout 300;
        fastcgi_read_timeout 300;
    }
}
```

### Nodejs网站配置

```nginx
server {
    listen 80;
    server_name api.codedocs.io;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass    http://127.0.0.1:3002;
    }
}
```

### 流量按入口域名分发到内部服务器

常用的场景就是有一台 `proxy` 服务器对外可访问，域名和流量都指向 `proxy` 服务器，由 `proxy` 服务器来分发给内部的服务器。好处就是内部服务器可以很容易更换或重新分配，外部无感知。

```nginx
server {
    listen 80;
    server_name *.test.codedocs.io;

    location / {
      proxy_set_header Host $host;
      proxy_pass http://10.0.1.117;
    }
}
```

### 网站基本访问权限控制

```nginx
server {
    listen 80;
    server_name log.codedocs.io;
    location / {
      auth_basic  "Restricted";
      auth_basic_user_file /etc/nginx/conf.d/.htpasswd;

      proxy_pass http://log.internal.codedocs.io:5601;
    }
}
```

`.htpasswd` 用来保存用户名密码，按以下命令生成:

```bash
printf "<username>:$(openssl passwd -crypt <password>)\n" >> /etc/nginx/conf.d/.htpasswd
```

### 数据库代理

**场景:** 开放数据库访问权限给第三方统计分析服务。

1. `yum install -y nginx-mod-stream`。

2. 添加 `/usr/share/nginx/modules/stream-proxy.conf` 文件。重启 `nginx` 之后就可以通过代理服务器IP和3308端口连上数据库了。

```nginx
stream {
    server {
        listen 3308;
        proxy_pass xxx.xxx.us-west-2.rds.amazonaws.com:3306;
        proxy_timeout 3600s;
        proxy_connect_timeout 3600s;
    }
}
```

### 分发流量

[http://nginx.org/en/docs/http/ngx_http_upstream_module.html](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)

1. 文件 `/etc/nginx/sites-enabled/streams.conf` 加以下内容

```nginx
upstream backend {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    server 127.0.0.1:8084;
}
```

2. 使用的地方

```nginx
server {
    location / {
        proxy_pass http://backend;
    }
}
```

### Websocket

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
     listen 80;
     server_name ws.adoc.ink;
     location / {
         proxy_pass http://127.0.0.1:8098;
         proxy_read_timeout 300s;
         proxy_send_timeout 300s;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection $connection_upgrade;
     }
     access_log   /var/log/nginx/ws_access.log main buffer=32k flush=5s;
     error_log    /var/log/nginx/ws_error.log;
}
```