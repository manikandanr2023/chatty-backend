resource "aws_launch_template" "asg_launch" {
  name          = "${local.prefix}-launch-config"
  image_id      = data.aws_ami.ec2_ami.id
  instance_type = var.ec2_instance_type
  key_name      = "chatappKeyPair"
  user_data     = filebase64("${path.module}/userdata/user-data.sh")
  network_interfaces {
    associate_public_ip_address = false
    security_groups             = [aws_security_group.autoscaling_group_sg.id]

  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size           = 10 # Increase root volume from 2GB to 10GB (or more)
      volume_type           = "gp3"
      delete_on_termination = true
    }
  }

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_instance_profile.name
  }
  lifecycle {
    create_before_destroy = true
  }
  tags = merge(
    local.common_tags, tomap(({ "Name" = "${local.prefix}" }))
  )
}

