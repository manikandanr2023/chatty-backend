#!/bin/bash
cd /home/ec2-user/chatty-backend
sudo npm run build
sudo npm start > /var/log/application.log 2>&1 &
# Check if the application started successfully
if [ $? -eq 0 ]; then
    echo "Application started in the background."
    exit 0  # Exit with success code
else
    echo "Failed to start the application."
    exit 1  # Exit with failure code
fi