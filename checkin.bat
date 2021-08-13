@ECHO off
IF [%1]==[] (
    echo Parameter Missing - needs a comment
) ELSE (
    
call git add .
call git commit -m %1
call git pull

echo If all went well to push/commit to repo call master.bat
)