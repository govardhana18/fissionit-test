import React from 'react';
    
function Notification(props) {

    const items = props.notif.map((item) =>
            <div key={item.id}>
                <a className="dropdown-item" href="#">{item.inDet[0].name}, 
                {item.status === "CREATED"
                ?" added":" completed"} Todo</a>
                <div className="dropdown-divider"></div>
            </div>
    )
    return ( 
        <div className="dropdown-menu">
            {items}
        </div>
    );
}

export default Notification;