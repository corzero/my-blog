#!/bin/bash

echo "正在打包代码..."

npm run build

echo "正在压缩...."

# zip -q -r public.zip ./public
tar -zcvf public.tar.gz ./public

# zip -q -r images.zip ./.vuepress/public/image
tar -zcvf images.tar.gz ./.vuepress/public/image

echo "正在上传...."

scp public.tar.gz root@web:/usr/blog

rm -rf public public.tar.gz

# ssh root@web "cd /usr/blog;rm -rf public;unzip public.zip; rm public.zip" 
ssh root@web "cd /usr/blog;rm -rf public;tar -xzvf public.tar.gz; rm public.tar.gz" 

scp images.tar.gz root@web:/usr/blog/public

rm -rf images.tar.gz

echo "完成部署..."

echo "同步git..."

git add .

git commit -am"chore: update md by script execution"

git push

echo "全部完成..."

