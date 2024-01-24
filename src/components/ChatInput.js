
import {useState} from 'react';
export default function ChatInput () {
    const [textArea, setTextArea] = useState();
    return (
    <div className="chat-input">
        <textArea value={textArea}  onChange={(e) => setTextArea(e.target.value)} />
        <button className={"secondary-button"}>Submit</button>
        </div>
    )
}