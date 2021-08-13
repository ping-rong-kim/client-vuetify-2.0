@ECHO off
setlocal 
set message=%1
set message=%message:"=%
IF [%1]==[] (
    ECHO "Parameter Missing - needs a message"
) ELSE (       
    REM Domun#alerts
    CALL curl -X POST -H "Content-type: application/json" --data "{'text':'%message%'}" https://hooks.slack.com/services/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

    REM old - Dahlia.... CALL curl -X POST -H "Content-type: application/json" --data "{'text':'%message%'}" https://hooks.slack.com/services/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

    REM Domun-Vlad#alerts
    CALL curl -X POST -H "Content-type: application/json" --data "{'text':'%message%'}" https://hooks.slack.com/services/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

    REM Domun-Farhad#alerts
    CALL curl -X POST -H "Content-type: application/json" --data "{'text':'%message%'}" https://hooks.slack.com/services/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
)
