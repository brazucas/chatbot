#!/bin/bash
docker build . -t chatbot:latest
docker save chatbot:latest | gzip > brzchatbot_image.tgz
scp -i "instancekey.pem" brzchatbot_image.tgz ec2-user@ec2-13-211-233-114.ap-southeast-2.compute.amazonaws.com:/home/ec2-user
ssh -i "instancekey.pem" ec2-user@ec2-13-211-233-114.ap-southeast-2.compute.amazonaws.com "docker load -i brzchatbot_image.tgz && docker run -d -p 80:80 -p 443:443 chatbot:latest"
rm -rf brzchatbot_image.tgz