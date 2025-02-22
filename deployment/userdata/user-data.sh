#!/bin/bash

echo "user data"
function program_is_installed {
  type $1 >/dev/null 2>&1 && echo 1 || echo 0
}


sudo yum update -y
sudo dnf update -y

sudo yum install ruby -y
sudo yum install wget -y
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

sudo dnf install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo docker pull redis
sudo docker run --name chatapp-redis -p 6379:6379 --restart always --detach redis



sudo yum install ruby
sudo yum install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

if [ $(program_is_installed node) -eq 0 ];then
sudo yum install -y curl gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_current.x | sudo bash -
sudo yum install -y nodejs
if [ -f ~/.bashrc ]; then
    PROFILE=~/.bashrc
elif [ -f ~/.bash_profile ]; then
    PROFILE=~/.bash_profile
else
    echo "No profile file found. Creating ~/.bashrc."
    PROFILE=~/.bashrc
    touch $PROFILE
fi
source $PROFILE
fi

if [ $(program_is_installed git) -eq 0 ]; then
  sudo yum install -y git
fi



if [ $(program_is_installed pm2) -eq 0 ]; then
  npm install -g pm2
fi


cd /home/ec2-user
git clone -b main https://github.com/manikandanr2023/chatty-backend.git
cd chatty-backend


  sudo npm install --force
  sudo npm install mongoose --force
  sudo npm install ip --force
  sudo dnf install -y unzip

aws s3 sync s3://chattyapp-env-file/production/ .
sudo -u root unzip env-file.zip
sudo chmod 644 .env.production
sudo cp .env.production .env
sudo npm run build
sudo npm run start
