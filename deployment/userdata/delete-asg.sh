#!/bin/bash


ASG=$(aws autoscaling describe-auto-scaling-groups --no-paginate --output text \
    --query "AutoScalingGroups[?Tags[?Key=='Type' && Value=='$ENV_TYPE']].AutoScalingGroupName")


if [[ -z "$ASG" ]]; then
    echo "No Auto Scaling Group found with Type=Backend-default"
    exit 1
fi


for group in $ASG; do
    echo "Deleting Auto Scaling Group: $group"
    aws autoscaling delete-auto-scaling-group --auto-scaling-group-name "$group" --force-delete
done
