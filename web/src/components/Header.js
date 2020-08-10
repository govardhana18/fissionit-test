import React from 'react';
import { useSelector } from 'react-redux'
import LoginMenu from './LoginMenu'

function Header() {

    const info = useSelector(state => state);
    return ( 
        <div>
        {info.isLogin === true ? (
            <LoginMenu notifications={info.notifications} name={info.name} admin={info.admin} userId={info.userId}/>                
        ):(
            <div className="jumbotron text-center">
                <h1>ToDo Platform</h1>
                <h4>Sign In</h4>
            </div>  
        )}
        </div>
    );
}
export default Header;