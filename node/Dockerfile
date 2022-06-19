# 指定的一个基础镜像
FROM node:slim
# 工作目录
WORKDIR /www/node-server/  
# copy package.json 到工作目录中
COPY package.json /www/node-server
# 安装依赖
RUN npm install --registry=https://registry.npmmirror.com
# 拷贝当前目录的文件到工作目录中
# 如果有不需要忽略的文件，可以写在 .dockerignore 文件中，比如忽略 node_modules 文件夹
COPY . /www/node-server/
# 向外暴露3000端口
EXPOSE 3000
# 容器运行后执行的命令
CMD npm run start