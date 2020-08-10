import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { actions } from '../actions/index'
import socket  from "./Socket";

class UserList extends React.PureComponent {

    todo_action = (notifications = []) => {
        this.props.getNotifications(notifications)
        // console.log("notifications", notifications)
    }
    todo_add = (notifications = []) => {
        console.log(notifications, "todo add")
        this.props.getNotifications(notifications)
    }
    
    componentDidMount() {
        var adminId = this.props.by;
        if (adminId === 0)
            var adminId = this.props.userId;
        socket.emit("initial_connect",{childId:this.props.userId,parentId:this.props.by,admin:this.props.admin,adminId:adminId});
        this.props.getUserList(this.props.userId);
        socket.on("todo_action",this.todo_action);
        socket.on("todo_add",this.todo_add);
        // console.log("mount")
    }

    componentWillUnmount() {
        // console.log("unmount")
        socket.off("todo_action",this.todo_action);
        socket.off("todo_add",this.todo_add);
    }

    render() {
        const userList = (this.props.userList === undefined? []:this.props.userList);
        return ( 
            <div>
                <nav aria-label="breadcrumb" className="mt-1">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User List</li>
                        </ol>
                    </nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <Link to="/AddUser"><input type="button" className="btn btn-primary float-right mx-2" value="Add User"/></Link>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Todo View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {userList.map((rec,key)=>
                                             <tr key={key}>
                                                <th scope="row">{rec.id}</th>
                                                <td>{rec.name}</td>
                                                <td>{rec.email}</td>
                                                <td><Link to={"/ToDoList/"+rec.id}>view</Link></td>
                                            </tr>
                                            )}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return state
}

const actionCreators = {
    getUserList: actions.getUserList,
    getNotifications: actions.getNotifications
}

export default connect(mapStateToProps, actionCreators)(UserList);