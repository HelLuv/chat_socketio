import React from 'react';
import socket from "../services/socket";

const JoinBlock = () => {
    return (
        <div className="join-block">
            <input type="text" placeholder={'Room ID'}/>
            <input type="text" placeholder={'Your name'}/>
            <button className="btn btn-success">SIGN IN</button>
        </div>
    );
};

export default JoinBlock;
