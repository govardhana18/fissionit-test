var initialState = {};
if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null) {
    initialState = initialState = {
        isLogin: false
        ,isLoading: false
        ,name: ""
        ,email: ""
        ,admin: ""
        ,userId: ""
        ,by: ""
        ,notifications: []
    };   
} else {
    initialState = JSON.parse(localStorage.getItem('user'))
}

function reducer1(state = initialState, action) {
    if (action.type === "LOGIN_SUCCESS") {
        return JSON.parse(localStorage.getItem('user'))
    } else if (action.type === "LOGIN_FAIL") {
        return {isAlert: true, alertType: "alert-warning", alertMsg: "Failed to login" };
    } else if (action.type === "LOGOUT") {
        return {isAlert: false, alertType: "alert-success", alertMsg: "Logout done" };
    } else if (action.type === "REGISTRATION_SUCCESS") {
        return {...state, isAlert: true, alertType: "alert-success", alertMsg: "User added Successfully" };
    } else if (action.type === "REGISTRATION_FAIL") {
        return {...state, isAlert: true, alertType: "alert-warning", alertMsg: "Failed to add user" };
    } else if (action.type === "ADDTODO_SUCCESS") {
        return {...state, isAlert: true, newTodo:action.payload, alertType: "alert-success", alertMsg: "Todo added Successfully" };
    } else if (action.type === "ADDTODO_FAIL") {
        return {...state, isAlert: true, alertType: "alert-warning", alertMsg: "Failed to add Todo" };
    } else if (action.type === "USERLIST_SUCCESS") {
        return {...state, userList: action.payload};
    } else if (action.type === "USERLIST_FAIL") {
        return {...state, userList: []};
    } else if (action.type === "TODOLIST_SUCCESS") {
        return {...state, todoList: action.payload, todoUser: action.todoUser};
    } else if (action.type === "TODOLIST_FAIL") {
        return {...state, todoList: []};
    } else if (action.type === "COMPLETETODO_SUCCESS") {
        return {...state, todoList: action.payload,isAlert: true, alertMsg: "Succesfully todo completed."};
    } else if (action.type === "COMPLETETODO_FAIL") {
        return {...state, isAlert: true, alertMsg: "failed to complete todo."};
    } else if (action.type === "DELETETODO_SUCCESS") {
        return {...state, todoList: action.payload,isAlert: true, alertMsg: "Succesfully todo deleted."};
    } else if (action.type === "DELETETODO_FAIL") {
        return {...state, isAlert: true, alertMsg: "failed to delete todo."};
    } else if (action.type === "NOTIFICATIONS") {
        return {...state, notifications: action.payload};
    } else {
        return state;
    }
}
export default reducer1