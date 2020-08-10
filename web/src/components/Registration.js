import React, { useState } from 'react';
import { connect } from 'react-redux'
import { actions } from '../actions/index'

function Registration(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleRegistration(event) {
        event.preventDefault()
        props.registration(name, email, props.userId);
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mt-1">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="javascript:;">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Registration Page</li>
                </ol>
            </nav>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleRegistration}>
                    <div className={"alert "+(props.isAlert?props.alertType:"d-none")} role="alert">
                        Alert: {props.isAlert?props.alertMsg:""}
                    </div>
                    <div className="form-group">
                        <label for="regName">Name</label>
                        <input type="text" className="form-control" id="regName" name="regName" value={name} onChange={e => setName(e.target.value)} placeholder="name" required/>
                    </div>
                    <div className="form-group">
                        <label for="regEmail">Email address</label>
                        <input type="email" className="form-control" id="regEmail" name="regEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="form-control btn btn-primary" name="regSubmit" id="regSubmit" value="Add User"/>
                    </div>
                    <label>Note: Default password would be `test`</label>
                </form>
            </div>
        </div> 
    );
}

function mapStateToProps(state) {
	return state
}

const actionCreators = {
    registration: actions.registration
}

export default connect(mapStateToProps, actionCreators)(Registration);