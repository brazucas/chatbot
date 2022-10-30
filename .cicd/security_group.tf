resource "aws_security_group" "security_group" {
    name = "security_group"
    description = "Security group for the instance"
    
    dynamic "ingress" {
        iterator = port
        for_each = var.security_group_ingress_ports
        content {
            from_port = port.value
            to_port = port.value
            protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
        }
    }

    dynamic "egress" {
        iterator = port
        for_each = var.security_group_egress_ports

        content {
            from_port = port.value
            to_port = port.value
            protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
        }
    }
}