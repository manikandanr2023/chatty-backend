#!/bin/bash
cd /home/ec2-user/chatty-backend
sudo rm -rf .env .env.develop env-file.tar.gz env-file.zip
aws s3 sync s3://chattyapp-env-file/develop/ .
sudo -u root tar -xzf env-file.tar.gz
sudo chmod 644 .env.develop
sudo cp .env.develop .env
sudo pm2 delete all
sudo npm install --force