#!/bin/bash

# 这是一些注释，描述了脚本的一些信息
# http://10.0.11.100:8088/ 是某个服务的URL
# 10.0.11.100 是要SSH连接的远程服务器的IP地址
# 用户：liulihao
# 密码：password

# 设置bash脚本在遇到未设置的变量或命令执行失败时立即退出
set -o nounset
set -o errexit

# 检查参数
if [[ "$#" != 0 && "$1" == "-k" ]]; then
    echo "Keeping local docs, not building."
else
    npm run docsbuild
fi

# 根据需要修复循环
# for i in {33..35}; do
for i in 100; do
   echo "upload front-tenant to 10.0.11.$i"
   # 通过SSH连接到远程服务器，并执行一些命令
   ssh "liulihao@10.0.11.$i" <<EOF
   rm -rf /home/liulihao/oct-web-project-components-vue3/dist
   exit
EOF
   # 这里的命令应该在上一个SSH会话之外执行
   scp -r ./docs/.vitepress/dist "liulihao@10.0.11.$i":/home/liulihao/oct-web-project-components-vue3/
   # 通过SSH连接到远程服务器，并执行一些其他命令
   ssh "liulihao@10.0.11.$i" <<EOF
   cd /home/liulihao/oct-web-project-components-vue3
   ls
   echo "password" | sudo -S docker-compose restart
EOF
done