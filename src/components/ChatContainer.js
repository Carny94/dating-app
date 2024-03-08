import { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";


export default function ChatContainer ({user}) {
    const [ clickedUser, setClickUser] = useState(null);
    return(
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="option">onClick={()=> setClickUser(null)} Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            <MatchesDisplay matches= {user.mathches} setClickUser={setClickUser}/>
            { clickedUser &&  <ChatDisplay />}


        </div>

    )
}