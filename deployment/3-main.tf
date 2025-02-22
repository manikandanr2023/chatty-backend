terraform {
  backend "s3" {
    bucket  = "chatty-app-terrafrom-state"
    key     = "staging/chatapp.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "manikandan"

  }
}
