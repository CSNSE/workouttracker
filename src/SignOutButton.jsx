import { useAuthSignOutAction } from "./ui-components/utils";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SignOut(){
    const navigate = useNavigate();

    return  (
    <div>
    <button onClick={() => navigate('/Login')}>Sign Out</button>
    </div>
    );

}

export default SignOut;