import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { actions } from '../actions/index'

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log("state - virat", props)
    if (props.isLogin === true) {
        if (props.admin === "yes") {
            return <Redirect to='/UserList' />
        } else {
            return <Redirect to={'/ToDoList/'+props.userId} />
        }
    } 

    function handleLogin(event) {
        event.preventDefault()
        props.login(email,password);
    }

    return (     
        <div className="container">
            <form className="col-md-4 offset-md-4" onSubmit={handleLogin}>
                <div className={"alert "+(props.isAlert? props.alertType:"d-none")} role="alert">
                    Alert: {props.isAlert?props.alertMsg:""}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} id="loginEmail" name="loginEmail" placeholder="name@example.com" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} id="loginPassword" name="loginPassword" placeholder="*******" required/>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" className="form-control btn btn-primary" name="loginSubmit" id="loginSubmit" value="Sign In"/>
                </div>
            </form>
        </div>
    );
}

function mapStateToProps(state) {
	return state
}

const actionCreators = {
    login: actions.login
}

export default connect(mapStateToProps, actionCreators)(Login);