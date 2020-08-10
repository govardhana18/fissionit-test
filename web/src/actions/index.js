import * as Constants from '../components/constants';
import axios from 'axios'

const login = (email, password) => {

	return dispatch => {
		const postData = {
			email: email
			, password: password
		};

		axios.post(Constants.API_URL + "login", postData, { 'content-type': 'text/json' })
			.then(res => {
				if (res.data.data.length > 0) {
					const user = {
						isLogin: true
						, isLoading: false
						, name: res.data.data[0].name
						, email: res.data.data[0].email
						, admin: res.data.data[0].admin
						, userId: res.data.data[0].id
						, by: res.data.data[0].by
						, notifications: []
					};
					localStorage.setItem('user', JSON.stringify(user));
					dispatch({type:"LOGIN_SUCCESS"});
				} else {
                    dispatch({type:"LOGIN_FAIL"});
				}
			}).catch(err => {
				dispatch({type:"LOGIN_FAIL"});
			})
	}
}

const registration = (name, email, userId) => {

	return dispatch => {
		const postData = {
			name: name
			, email: email
			, userId: new String(userId)
		};

		axios.post(Constants.API_URL + "userRegistration", postData, { 'content-type': 'text/json' })
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: "REGISTRATION_SUCCESS" });
				} else {
					dispatch({ type: "REGISTRATION_FAIL" });
				}
			}).catch(err => {
				dispatch({ type: "REGISTRATION_FAIL" });
			})
	}
}

const addTodo = (priority, content, userId) => {

	return dispatch => {
		const postData = {
			priority: priority
			, content: content
			, userId: new String(userId)
		};

		axios.post(Constants.API_URL + "todo/add", postData, { 'content-type': 'text/json' })
			.then(res => {
				if (res.status === 200) {
					console.log("added", postData)
					dispatch({ type: "ADDTODO_SUCCESS",payload: {priority: priority, content: content, userId: userId } });
				} else {
					dispatch({ type: "ADDTODO_FAIL" });
				}
			}).catch(err => {
				dispatch({ type: "ADDTODO_FAIL" });
			})
	}
}

const getUserList = (userId) => {

	return dispatch => {

		axios.get(Constants.API_URL + "userList/"+userId)
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: "USERLIST_SUCCESS", payload: res.data.data});
				} else {
					dispatch({ type: "USERLIST_FAIL" });
				}
			}).catch(err => {
				dispatch({ type: "USERLIST_FAIL" });
			})
	}
}

const getTodoList = (userId) => {

	return dispatch => {
		axios.get(Constants.API_URL + "todo/viewAll/"+userId)
			.then(res => {
				if (res.status === 200) {
					console.log(res.data,"mahesh babu")
					dispatch({ type: "TODOLIST_SUCCESS", payload: res.data.data, todoUser: res.data.todoUser});
				} else {
					dispatch({ type: "TODOLIST_FAIL" });
				}
			}).catch(err => {
				dispatch({ type: "TODOLIST_FAIL" });
			})
	}
}

const getCompleteTodo = (toDoId, userId) => {
	return dispatch => {
		const postData = {
			toDoId: toDoId.toString()
		};
		
		axios.post(Constants.API_URL + "todo/complete", postData, { 'content-type': 'text/json' })
		.then((res) => {
			if (res.status === 200) {
				axios.get(Constants.API_URL + "todo/viewAll/"+userId)
				.then(res => {
					if (res.status === 200) {
						dispatch({ type: "COMPLETETODO_SUCCESS", payload: res.data.data});
					} else {
						dispatch({ type: "COMPLETETODO_FAIL" });
					}
				}).catch(err => {
					dispatch({ type: "COMPLETETODO_FAIL" });
				})
			} else {
				dispatch({ type: "COMPLETETODO_FAIL" });
			}
		}).catch(err => {
			dispatch({ type: "COMPLETETODO_FAIL" });
		})
	}
}

const getDeleteTodo = (toDoId, userId) => {
	return dispatch => {
		const postData = {
			toDoId: toDoId.toString()
		};
		
		axios.post(Constants.API_URL + "todo/delete", postData, { 'content-type': 'text/json' })
		.then((res) => {
			if (res.status === 200) {
				axios.get(Constants.API_URL + "todo/viewAll/"+userId)
				.then(res => {
					if (res.status === 200) {
						dispatch({ type: "DELETETODO_SUCCESS", payload: res.data.data});
					} else {
						dispatch({ type: "DELETETODO_FAIL" });
					}
				}).catch(err => {
					dispatch({ type: "DELETETODO_FAIL" });
				})
			} else {
				dispatch({ type: "DELETETODO_FAIL" });
			}
		}).catch(err => {
			dispatch({ type: "DELETETODO_FAIL" });
		})
	}
}

const getNotifications = (notifications) => {
	return dispatch => {
		dispatch({ type: "NOTIFICATIONS",payload: notifications });
	}
}

const logout = () => {
	return dispatch => {
		localStorage.removeItem('user');
		dispatch({ type: "LOGOUT" });
	}
}

export const actions = { login, registration, addTodo, getUserList, getTodoList, getDeleteTodo, getCompleteTodo, getNotifications, logout }