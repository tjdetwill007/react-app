#! /bin/bash
echo "Stopping the service"
sudo systemctl stop nginx
echo "Nginx server stopped"
echo "Cleaning files"
mkdir test
rm -rf /usr/share/nginx/html/*
if [ $? -eq 0 ]; then
  echo "Success delete"
else
  echo "Delete failed"
  exit 1
fi