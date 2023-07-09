package com.tfg.backend_gymrat.util;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class Log { //TODO: Format log (not show all console information, like server start. Just app info)

    public void log(String message){
        log.info(message);
        log.debug(message);
    }

    public void log(String message, Object p0){
        log.info(message,p0);
        log.debug(message,p0);
    }


}
