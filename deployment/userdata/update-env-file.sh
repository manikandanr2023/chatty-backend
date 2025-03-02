#!/bin/sh
sudo dnf update -y
sudo dnf install -y zip
echo "update env file"
aws s3 sync s3://chattyapp-env-file/develop/ .
unzip env-file.zip
cp .env.develop .env
rm .env.develop
sed -i -e "s|\(^REDIS_HOST=\).*|REDIS_HOST=redis://$ELASTICACHE_ENDPOINT:6379|g" .env
rm -rf env-file.zip
cp .env .env.develop
zip env-file.zip .env.develop
aws --region us-east-1 s3 cp env-file.zip s3://chattyapp-env-file/develop/
rm -rf .env*
rm -rf env-file.zip

