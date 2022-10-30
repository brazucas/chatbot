resource "aws_instance" "ec2" {
    ami = "ami-02a66f06b3557a897"
    instance_type = "t2.micro"
    user_data = file("./instance_startup.sh")
    availability_zone = "ap-southeast-2a"
    security_groups = [aws_security_group.security_group.name]
    key_name = aws_key_pair.instancekey.key_name

    depends_on = [
      aws_key_pair.instancekey
    ]

    connection {
        type        = "ssh"
        host        = self.public_ip
        user        = "ubuntu"
        private_key = aws_key_pair.instancekey.key_name
        timeout     = "4m"
    }

    tags = {
        Name = "brzchatbot"
    }
}

resource "aws_key_pair" "instancekey" {
  key_name = "instancekey"
  public_key = file("instancekey.pub")
  tags = {
    Name = "brzchatbot"
  }
}

output "instance_id" {
    value = aws_instance.ec2.id
}

output "instance_dns" {
    value = aws_instance.ec2.public_dns
}