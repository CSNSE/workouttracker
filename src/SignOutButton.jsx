import { useAuthSignOutAction } from "./ui-components/utils";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function SignOut(){
    const signOut = useAuthSignOutAction();

    return  (
    <div>
    <button onClick={signOut}>Logout</button>
    </div>
    );

}

export default SignOut;