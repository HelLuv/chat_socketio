import React, {useState} from 'react';
import socket from "../services/socket";
import axios from "axios";

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Invalid data entered')
        }
        const obj = {
            roomId, userName
        };
        setIsLoading(true);
        await axios.post('/rooms', obj);
        onLogin(obj);
    };

    return (
        <div className="join-block">
            <input
                type="text"
                placeholder={'Room ID'}
                value={roomId}
                onChange={e => setRoomId(e.target.value)}/>
            <input
                type="text"
                placeholder={'Your name'}
                value={userName}
                onChange={e => setUserName(e.target.value)}/>
            <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
                {!isLoading ? 'SIGN IN' : 'LOADING...'}
            </button>
        </div>
    );
};

export default JoinBlock;
