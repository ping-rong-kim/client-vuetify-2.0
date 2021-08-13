@ECHO off
IF [%1]==[] (
    echo Parameter Missing - needs a comment
)
IF [%BRANCH-CLIENT%]==[] (
    echo Branch not set - please do manually - feature/jwt-authentication
) 

IF NOT [%1]==[] IF NOT [%BRANCH-CLIENT%]==[] (

    call git checkout -b %BRANCH-CLIENT%
    call git add .
    call git commit -m %1
)