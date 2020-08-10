import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Login from './Login'
import UserList from './UserList'
import ToDoList from './ToDoList'
import Registration from './Registration'
import AddToDo from './AddTodo'
import Header from './Header';
import { useSelector } from 'react-redux'

export default function Routes() {
  function PrivateRoute ({component: Component, authenticated, ...rest}) {
    const info = useSelector(state => state);
    return (
		<Route
			{...rest}
			render={(props) => info.isLogin === true
			? <Component {...props} />
			: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		/>
    )
  }

  return (
    <div>
        <Router>
            <Header/>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/AddUser" component={Registration} />
              <PrivateRoute path="/UserList" component={UserList} />
              <PrivateRoute path="/ToDoList/:userId" component={ToDoList} />
              <PrivateRoute path="/AddToDo" component={AddToDo} />
              {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
              <Route component={Login} />
            </Switch>
        </Router>
    </div>
  );
}