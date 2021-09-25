import React from 'react';
import socket from "../services/socket";

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue,
        });
        onAddMessage({userName, text: messageValue});
        setMessageValue('');
    };

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    return (
        <div className={`chat`}>
            <div className={`chat-users`}>
                <b>Room: <span>{roomId}</span></b>
                <hr/>
                <b>Online (<span className={`users-amount`}>{users.length}</span>):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((message) => (
                        <div className="message">
                            <p>{message.text}</p>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
                    <textarea
                        placeholder={`Enter your message ...`}
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        rows="3">
                        className={`form-control`}
                    </textarea>
                    <button disabled={!messageValue.length > 0 ? 'disabled' : ''}
                            onClick={onSendMessage}
                            type={`button`}
                            className={`btn btn-success`}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
