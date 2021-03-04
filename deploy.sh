#!/bin/bash

echo "正在打包代码..."

npm run build

echo "正在压缩...."

zip -q -r public.zip ./public

echo "正在上传...."

scp public.zip root@web:/usr/blog

rm -rf public public.zip

ssh root@web "cd /usr/blog;rm -rf public;unzip public.zip; rm public.zip" 

echo "完成部署..."