resource "aws_iam_role" "code_deploy_iam_role" {
  name = var.code_deploy_role_name
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codedeploy.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "AWSCodeDeployRole" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
  role       = aws_iam_role.code_deploy_iam_role.name
}
resource "aws_iam_role_policy_attachment" "AWSCodeDeployRoleEC2Role" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
  role       = aws_iam_role.code_deploy_iam_role.name
}
resource "aws_iam_role_policy_attachment" "AutoScalingFullAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AutoScalingFullAccess"
  role       = aws_iam_role.code_deploy_iam_role.name
}
# Define the custom policy
resource "aws_iam_policy" "custom_policy" {
  name        = "CustomPolicyForCodeDeploy"
  description = "Custom policy to allow PassRole, CreateTags, and RunInstances"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "VisualEditor0"
        Effect = "Allow"
        Action = [
          "iam:PassRole",
          "ec2:CreateTags",
          "ec2:RunInstances"
        ]
        Resource = "*"
      }
    ]
  })
}


# Attach the custom policy to the IAM role
resource "aws_iam_role_policy_attachment" "custom_policy_attachment" {
  role       = aws_iam_role.code_deploy_iam_role.name
  policy_arn = aws_iam_policy.custom_policy.arn
}
