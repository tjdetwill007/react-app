#! /bin/bash
echo "Stopping the service"
sudo systemctl stop nginx
echo "Nginx server stopped"
echo "Cleaning files"
rm -rf /usr/share/ngix/html/*
if [ $? -eq 0 ]; then
  echo "Success delete"
else
  echo "Delete failed"
  exit 1
fi