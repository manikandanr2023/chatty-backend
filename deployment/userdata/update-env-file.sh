#!/bin/bash
echo "update env file"
aws s3 sync s3://chattyapp-env-file/production/ .
unzip env-file.zip
cp .env.production .env
rm .env.production
sed -i -e "s|\(^REDIS_HOST=\).*|REDIS_HOST=redis://$ELASTICACHE_ENDPOINT:6379|g" .env
rm -rf env-file.zip
cp .env .env.production
powershell Compress-Archive -Path .env.production -DestinationPath env-file.zip -Force
aws --region us-east-1 s3 cp env-file.zip s3://chattyapp-env-file/production/
rm -rf .env*
rm -rf env-file.zip
