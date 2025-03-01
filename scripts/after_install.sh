#!/bin/sh
cd /home/ec2-user/chatty-backend
sudo rm -rf env-file.zip
sudo rm -rf .env
sudo rm -rf .env.develop
aws s3 sync s3://chattyapp-env-file/develop/ .
sudo -u root unzip env-file.zip
sudo chmod 644 .env.develop
sudo cp .env.develop .env
sudo pm2 delete all
sudo npm install --force