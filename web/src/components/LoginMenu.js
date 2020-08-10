import React from 'react';
import { Link } from "react-router-dom";
import Notification from './Notication'

function LoginMenu(props) {

    function deleteStorage() {
        localStorage.removeItem('user');
        window.location.reload(false);
    }

    var notif = []
    if (props.notifications !== undefined) {
         notif = props.notifications;
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">TODO PLATFORM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className={"nav-item "+(props.admin !== "yes"?'d-none':'')}>
                    <Link className="nav-link" to={"/UserList"}>Users </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/ToDoList/"+props.userId}>Todo </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"javascript:void(0)"} onClick={deleteStorage}>Logout</Link>
                </li>
            </ul>
            </div>

            {props.admin === "yes"?
            <div className="btn-group">
            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notifications <span className="badge badge-light">{ notif.length}</span>
            </button>
            {notif.length > 0?
            <Notification notif={notif}/>
            :
            <div className="dropdown-menu" x-placement="bottom-start" >
                <a className="dropdown-item" href="#">Not found.</a>
            </div>
            }
            </div>
            :""}
        </nav>
    );
}
export default LoginMenu;