import React, { useState } from 'react';
import { connect } from 'react-redux'
import { actions } from '../actions/index'
import socket  from "./Socket";

function AddToDo(props) {

    const [priority, setPriority] = useState("");
    const [content, setContent] = useState("");

    function handleTodo(event) {
        event.preventDefault()
        props.addTodo(priority, content, props.userId)
    }
    
    if (props.newTodo !== undefined) {
        var adminId = props.by;
        if (adminId === 0)
            var adminId = props.userId;
        socket.emit("initial_connect",{childId:props.userId,parentId:props.by,admin:props.admin,adminId:adminId});
    }

    return (
        <div>
            <nav aria-label="breadcrumb" className="mt-1">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add ToDo</li>
                </ol>
            </nav>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleTodo}>
                    <div className={"alert "+(props.isAlert?props.alertType:"d-none")} role="alert">
                        Alert: {props.isAlert?props.alertMsg:""}
                    </div>
                    <div className="form-group">
                        <label>Priority</label>
                        <select className="form-control" value={priority} onChange={e => setPriority(e.target.value)} name="todoPriority" id="todoPriority" required><option value="">Select Priority</option><option value="low">low</option><option value="medium">medium</option><option value="high">high</option></select>
                    </div>
                    <div className="form-group">
                        <label>ToDo Content</label>
                        <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} id="todoContent" name="todoContent" rows="3" required></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="form-control btn btn-primary" name="todoSubmit" id="todoSubmit" value="Add ToDo"/>
                    </div>
                </form>
            </div>
        </div> 
    );
}

function mapStateToProps(state) {
	return state
}

const actionCreators = {
    addTodo: actions.addTodo
}

export default connect(mapStateToProps, actionCreators)(AddToDo);