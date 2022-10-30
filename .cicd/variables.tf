variable "aws_region" {
  type        = string
  description = "AWS region to deploy to"
  default     = "ap-southeast-2"
}

variable "notification_emails" {
    type = list(string)
    description = "Email addresses to send notifications to"
    default = ["pedro.papadopolis@gmail.com"]
}

variable "security_group_ingress_ports" { 
    type = list(number)
    description = "Ports to open for ingress"
    default = [3000,22]
}

variable "security_group_egress_ports" { 
    type = list(number)
    description = "Ports to open for egress"
    default = [3000, 3306, 80, 443]
}