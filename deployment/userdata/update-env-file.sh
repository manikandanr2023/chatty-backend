#!/bin/sh
echo "update env file"
aws s3 sync s3://chattyapp-env-file/develop/ .
unzip env-file.zip
cp .env.develop .env
rm .env.develop
sed -i -e "s|\(^REDIS_HOST=\).*|REDIS_HOST=redis://$ELASTICACHE_ENDPOINT:6379|g" .env
rm -rf env-file.zip
cp .env .env.develop

# Variables
SOURCE_FILE_OR_DIR=".env.develop"
ARCHIVE_NAME="env-file.zip"

# Compress using zip
if zip -r "$ARCHIVE_NAME" "$SOURCE_FILE_OR_DIR"; then
    echo "Compression successful: $ARCHIVE_NAME"
else
    echo "Compression failed!"
    exit 1
fi


aws --region us-east-1 s3 cp env-file.zip s3://chattyapp-env-file/develop/
rm -rf .env*
rm -rf env-file.zip
