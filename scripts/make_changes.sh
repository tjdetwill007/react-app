#! /bin/bash
echo "Running server"
systemctl start nginx
if [ $? -eq 0 ]; then
  echo "server started"
else
  echo "Error occured"
  exit 1
fi