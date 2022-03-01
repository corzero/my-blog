#!/bin/bash

echo "同步图片数据..."

scp root@web:/usr/blog/public/images.tar.gz ./

rm -rf ./.vuepress/public/image

tar -xzf images.tar.gz ./.vuepress/public/image

rm images.tar.gz

echo "同步OK"