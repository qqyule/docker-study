# 指定的一个基础镜像
FROM alpine:latest

# 安装node环境
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories \
  && apk add --update --no-cache nodejs npm
# 工作目录
WORKDIR /www/node-server/  
# copy package.json 到工作目录中
COPY package.json /www/node-server
# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
# 安装依赖
RUN npm install
# 拷贝当前目录的文件到工作目录中
# 如果有不需要忽略的文件，可以写在 .dockerignore 文件中，比如忽略 node_modules 文件夹
COPY . /www/node-server/
# 向外暴露3000端口
EXPOSE 3000
# 容器运行后执行的命令
CMD npm run start