#! /bin/bash
echo "Copying files to server"
cp -rf ../dist/* /var/www/html/
if [ $? -eq 0 ]; then
  echo "Success copy"
else
  echo "Copy failed"
  exit 1
fi