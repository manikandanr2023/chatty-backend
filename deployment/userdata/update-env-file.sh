#!/bin/bash
echo "update env file"
aws s3 sync s3://chattyapp-env-file/staging/ .
unzip env-file.zip
cp .env.staging .env
rm .env.staging
sed -i -e "s|\(^REDIS_HOST=\).*|REDIS_HOST=redis://$ELASTICACHE_ENDPOINT:6379|g" .env
rm -rf env-file.zip
cp .env .env.staging
powershell Compress-Archive -Path .env.staging -DestinationPath env-file.zip -Force
aws --region us-east-1 s3 cp env-file.zip s3://chattyapp-env-file/staging/
rm -rf .env*
rm -rf env-file.zip
