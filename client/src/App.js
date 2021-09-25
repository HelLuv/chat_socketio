import JoinBlock from "./components/JoinBlock";
import {useReducer} from "react";
import reducer from "./services/reducer";


function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj,
        });
    }

    return (
        <div className={'wrapper'}>
            {!state.joined ? (<JoinBlock onLogin={onLogin}/>) :
                (<h1>CHAD</h1>)}
        </div>
    );
}

export default App;
