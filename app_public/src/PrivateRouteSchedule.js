import React from "react";
import {Route,Redirect} from 'react-router-dom';

const PrivateRouteSchedule = ({children,...rest}) =>{
    let isauth = false;
  
    if(sessionStorage.getItem('userData'))
    {
    isauth=true;
    return (<Route {...rest} render={()=>isauth?(children):(<Redirect to={'/schedule'}/>)}/>);

    }
    
    return (<Route {...rest} render={()=>isauth?(children):(<Redirect to={'/login'}/>)}/>);
}

export default PrivateRouteSchedule;