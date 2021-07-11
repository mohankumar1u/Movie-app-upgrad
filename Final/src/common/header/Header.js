import React, { useState, useEffect } from "react";
import "./Header.css";
import { Button } from '@material-ui/core';
import LogoName from "../../assets/logo.svg";
import Dialog from '@material-ui/core/Dialog';
const Header = (props) => {
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
    }, []);
    const handleLogin = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    return (
        <div id="header">
            <div>	<img id="logo-btn" src={LogoName} alt="logo" /></div>
            <div id="log-btn"><Button onClick={handleLogin} variant="contained" color="default">
                {props.header ? "Logout" : "Login"}</Button> </div>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                hello
            </Dialog>
        </div>
    );

}
export default Header;