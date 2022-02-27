#!/bin/bash

echo "正在打包代码..."

npm run build

echo "正在压缩...."

zip -q -r public.zip ./public

zip -q -r images.zip ./.vuepress/public/image

echo "正在上传...."

scp public.zip root@web:/usr/blog

rm -rf public public.zip

ssh root@web "cd /usr/blog;rm -rf public;unzip public.zip; rm public.zip" 

scp images.zip root@web:/usr/blog/public

rm -rf images.zip

echo "完成部署..."

echo "同步git..."

git add .

git commit -am"chore: update md by script execution"

git push

echo "全部完成..."

