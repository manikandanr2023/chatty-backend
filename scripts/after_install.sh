#!/bin/bash
cd /home/ec2-user/chatty-backend
sudo rm -rf env-file.zip
sudo rm -rf .env
sudo rm -rf .env.production
aws s3 sync s3://chattyapp-env-file/production/ .
sudo -u root unzip env-file.zip
sudo chmod 644 .env.production
sudo cp .env.production .env
sudo pm2 delete all
sudo npm install --force