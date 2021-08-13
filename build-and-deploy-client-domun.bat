@ECHO off
SET "IF_ERROR=set foundErr=1&(if errorlevel 0 if not errorlevel 1 set foundErr=)&if defined foundErr"

REM TODO: combine this into build-and-deploy-generic.bat and make it
REM support the environments and server names passed in as a params
REM will need regestration of new %build-env% service.

SET "dd=%date:~0,2%"
SET "mth=%date:~3,2%" 
SET "yyyy=%date:~6,4%"
SET "h=%time:~0,2%"
SET "hh=%h: =0%"
SET "mm=%time:~3,2%"
SET "ss=%time:~6,2%"
SET "timestamp=%yyyy%%mth%%dd%-%hh%%mm%%ss%"

REM :: load last version and increment
SET Count=1
for /f "tokens=1,2 delims==." %%a in (version.txt) do (
    SET major=%%a
    SET /a minor=%%b+1
    SET /a Count+=1
)

REM :: write new version to file
ECHO %major%.%minor%>version.txt
ECHO %major%.%minor%-%timestamp%>build.txt


SET "admin-filename=admin-%timestamp%.zip"
SET "server-filename=server-%timestamp%.zip"
SET "dashboard-filename=dashboard-%timestamp%.zip"
rem SET "api-docs-filename=api-docs-%timestamp%.zip"
SET "api-server-filename=api-server"
SET "linux-api-server-filename=%api-server-filename%.so"
SET "windows-api-server-filename=%api-server-filename%.exe"
SET "linux-api-server-zip_filename=%api-server-filename%-%timestamp%.zip"
SET "windows-api-server-zip_filename=win64-%api-server-filename%-%timestamp%.zip"
SET "target-env=centos-02"
REM when we have sites and rtpes of build, i.e. qa etc then this can be production
SET "build-env=production" 
SET "sitename=domun"
SET "varient=%sitename%-%build-env%"
SET "varientDir=%sitename%/%build-env%"
SET "client-filename=%varient%-client-%timestamp%.zip"
REM build the vue client
CALL npm run build:%varient%

   
    REM zip the exe, just to so we have a file name with a time stamp for easy roll backs
    "C:\Program Files\7-Zip\7z.exe" a "./build/%client-filename%"  "./dist/%varientDir%/*"
  
    ECHO Deploying executable to %target-env% server, site %sitename%:
    ssh -t -i ~/.ssh/do-ssh-key root@134.209.17.205 "mkdir -p ~/%sitename%/%build-env%"
    CALL scp -i ~/.ssh/do-ssh-key ./build/%client-filename% root@134.209.17.205:~/%sitename%/%build-env%

    ECHO Copy and deploying latest deploy-client-%sitename% scripts to %target-env%:
    cp ./deploy-client-%sitename%.sh ./build/
    CALL scp -i ~/.ssh/do-ssh-key ./build/deploy-client-%sitename%.sh root@134.209.17.205:~/%sitename%/%build-env%
    
    ECHO.
    ECHO Deploying on %target-env% %sitename% server.
    ssh -t -i ~/.ssh/do-ssh-key root@134.209.17.205 "chmod 750 ~/%sitename%/%build-env%/deploy-client-%sitename%.sh"
    ssh -t -i ~/.ssh/do-ssh-key root@134.209.17.205 "~/%sitename%/%build-env%/deploy-client-%sitename%.sh -d %timestamp%"
    ECHO.
    ECHO Deployed client to  %target-env% %sitename% server. 
    ECHO.
   )
