@ECHO off
call checkin %1
call build-and-deploy-client
)