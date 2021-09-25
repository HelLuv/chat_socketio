import {useEffect, useReducer} from "react";
import reducer from "./services/reducer";
import socket from "./services/socket";
import axios from "axios";
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";

const initialState = {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj,
        });
        socket.emit('ROOM:JOIN', obj);
        const {data} = await axios.get(`/rooms/${obj.roomId}`);
        dispatch({
            type: 'SET_DATA',
            payload: data,
        });
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message,
        });
    };

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);

    window.socket = socket;

    return (
        <div className={'wrapper'}>
            {!state.joined ? (
                    <JoinBlock onLogin={onLogin}/>)
                : (
                    <Chat {...state} onAddMessage={addMessage}/>
                )}
        </div>
    );
}

export default App;
