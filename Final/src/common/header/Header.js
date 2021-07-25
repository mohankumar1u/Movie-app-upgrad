import React, { useState } from "react";
import "./Header.css";
import { Button, FormControl } from '@material-ui/core';
import LogoName from "../../assets/logo.svg";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
const Header = (props) => {
    const [open, setOpen] = useState(false);
    const [loginFrom,setLoginFrom] = useState(true);
    const [loginValues, setLoginValues] = useState([]);
    const [registerValues, setregisterValues] = useState([]);
    const [errorsValues,setErrorsValues] = useState({});

    const handleLogin = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleSubmit =(e)=>{

        console.log(e);
        if(e === "login"){
            const mustKeys =["userName","Password"];
           let errors={};
            mustKeys.forEach(field => {
                if (!loginValues[ field ] || loginValues[ field ]==="") {
                  errors[ field ] = true
                }
              })
              console.log(errors);
              if(errors !== {}){
              console.log(errors);
              setErrorsValues(errors);
              return;
              }
        }else{
            const mustKeys =['firstName',
                'lastName',
                'email',
                'registerPassword',
                'Contact'];
                console.log(mustKeys);
           let errors={};
                mustKeys.forEach(field => {
                if (!registerValues[ field ] || registerValues[ field ]==="") {
                  errors[ field ] = true
                }
              })

              if(errors !== {}){
                  debugger
                setErrorsValues(errors);
                return;
                }
        }
    }
    const handleLoginVlaues =(e, key)=>{
        
        let value = loginValues
        console.log(value);
        value[key]= e.target.value
        console.log(value);
        setLoginValues(value);
    }
    const handleRegisterVlaues =(e, key)=>{
        
        let value = registerValues
        console.log(value);
        value[key]= e.target.value
        console.log(value);
        setregisterValues(value);
    }
    return (
        <div id="header">
            <div>	<img id="logo-btn" src={LogoName} alt="logo" /></div>
            <div id="log-btn"><Button onClick={handleLogin} variant="contained" color="default">
                {props.header ? "Logout" : "Login"}</Button> </div>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <div id="popup">
                    <div id="log-heading">
                        <div className={loginFrom?"border-red":""} onClick={()=>{setLoginFrom(true)}}>LOGIN</div>
                        <div className={!loginFrom?"border-red":""} onClick={()=>{setLoginFrom(false)}}>REGISTER</div>
                    </div> 
                        <div className={!loginFrom?"display-hidden":""}>
                            <form onSubmit={(e)=>{e.preventDefault();handleSubmit("login")}}>
                            <FormControl className="input"><TextField error={errorsValues["userName"]} helperText="required" onChange={(e)=>{handleLoginVlaues(e,"userName")
                            }}label='User Name*' placeholder='Enter user Name' fullWidth /></FormControl>
                            <FormControl className="input"><TextField error={errorsValues["Password"]} helperText="required" onChange={(e)=>{handleLoginVlaues(e,"Password")
                            }}label='Password*' placeholder='Enter Password' type='password' fullWidth /></FormControl>
                            <Button className="submit-btn" type='submit' color='primary' variant="contained" >Login</Button>
                            </form>
                        </div>
                        <div className={loginFrom?"display-hidden":""}>
                            <form onSubmit={(e)=>{e.preventDefault();handleSubmit("register")}}>
                            <FormControl className="input"><TextField error={errorsValues["firstName"]} helperText="required" onChange={(e)=>{handleRegisterVlaues(e,"firstName")}} label='first Name*' placeholder='Enter first Name' fullWidth /></FormControl>
                            <FormControl className="input"><TextField error={errorsValues["lastName"]} helperText="required" onChange={(e)=>{handleRegisterVlaues(e,"lastName")}} label='last Name*' placeholder='Enter last Name' fullWidth /></FormControl>
                            <FormControl className="input"><TextField error={errorsValues["email"]} helperText="required" onChange={(e)=>{handleRegisterVlaues(e,"email")}} label='email*' placeholder='Enter email' fullWidth /></FormControl>
                            <FormControl className="input"><TextField error={errorsValues["registerPassword"]} helperText="required" onChange={(e)=>{handleRegisterVlaues(e,"registerPassword")}} label='Password*' placeholder='Enter password' type='password' fullWidth /></FormControl>
                            <FormControl className="input"><TextField error={errorsValues["Contact"]} helperText="required" onChange={(e)=>{handleRegisterVlaues(e,"Contact")}} label='Contact No.' placeholder='Contact No.*' fullWidth /></FormControl>
                            <Button className="submit-btn" type='submit' color='primary' variant="contained" >Register</Button>
                            </form>
                        </div>
                    
                </div>
            </Dialog>
        </div>
    );

}
export default Header;