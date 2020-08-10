import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { actions } from '../actions/index'
import socket from './Socket'

class ToDoList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = [];
    }
    componentDidMount() {
        console.log(this.props,"init")
        var userId = this.props.match.params.userId;
        if (userId === undefined || userId === 0)
            userId = this.props.userId
        this.props.getTodoList(userId);
    }

    // static getDerivedStateFromProps(props, state) {
        // props.getTodoList(props.match.params.userId);
    // }

    completeToDo = (todoId) => {
        // console.log(todoId)
        this.props.getCompleteTodo(todoId,this.props.userId)

        var adminId = this.props.by;
        if (adminId === 0)
            var adminId = this.props.userId;
        socket.emit("initial_connect",{childId:this.props.userId,parentId:this.props.by,admin:this.props.admin,adminId:adminId});
    }

    deleteToDo = (todoId) => {
        // console.log(todoId)
        this.props.getDeleteTodo(todoId,this.props.userId)
    }

    render() {
        const todoList = (this.props.todoList === undefined? []:this.props.todoList);
        var isSameUser = false;
        if ( parseInt(this.props.match.params.userId) === parseInt(this.props.userId) ) {
            isSameUser = true;
        }
        return ( 
            <div>
                    <nav aria-label="breadcrumb" className="mt-1">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">To Do List - [
                            {this.props.todoUser !== undefined?
                            this.props.todoUser.name:""}]
                            </li>
                        </ol>
                    </nav>
                    <div className="container">
                        <div className="row">


                            <div className="col-sm-12">
                            {isSameUser === true 
                            ?    <Link to="/AddToDo"><input type="button" className="btn btn-primary float-right mx-2" value="Add ToDo"/></Link>
                            :""}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ToDo Content</th>
                                            <th scope="col">Priority</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {todoList.map((rec,key)=>
                                             <tr key={key}>
                                                <th scope="row">{rec.id}</th>
                                                <td>{rec.priority}</td>
                                                <td>{rec.content}</td>
                                                <td>{rec.status !== undefined || rec.status === "CREATED"? rec.status:"ACTIVE"}</td>
                                                <td>
                                                    {isSameUser === true && rec.status !== "COMPLETED"
                                                    ?<div><button onClick={()=>this.deleteToDo(rec.id)} className="btn btn-warning mx-2">Delete</button>
                                                    <button onClick={()=>this.completeToDo(rec.id)} className="btn btn-primary mx-2">Complete</button></div>
                                                    :""
                                                    }
                                                </td>
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
    getTodoList: actions.getTodoList
    ,getDeleteTodo: actions.getDeleteTodo
    ,getCompleteTodo: actions.getCompleteTodo
}

export default connect(mapStateToProps, actionCreators)(ToDoList);