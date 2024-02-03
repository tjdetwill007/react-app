#! /bin/bash
echo "Copying files to server"
cp -rf /home/ec2-user/dist/* /usr/share/nginx/html/
if [ $? -eq 0 ]; then
  echo "Success copy"
else
  echo "Copy failed"
  exit 1
fi
echo "Running server"
systemctl start nginx