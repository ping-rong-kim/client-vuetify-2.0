@ECHO OFF
git pull
cd ..
call build-and-deploy-client.bat
cd client