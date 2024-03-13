import ChatInput from "./ChatInput";
import Chat from "./Chatt";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function ChatDisplay ({user, clickedUser}) {

    const [usersMessages, setUsersMessages] = useState();
    const [clickedUserMessages, setClickedUsersMessages] = useState(null)
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id;

    const getUsersMessages = async () => {
        try {
        const response = await axios.get('http://localhost:3000/messages',{
            params: { 
                userId: userId, 
                correspondingUserId: clickedUserId}
        })
        setUsersMessages(response.data)
    } catch(error) {
        console.log(error)
    }
}

const getClickedUsersMessages = async () => {
    try {
    const response = await axios.get('http://localhost:3000/messages',{
        params: { 
            userId: clickedUserId, 
            correspondingUserId: clickedUserId}
    })
    setClickedUsersMessages(response.data)
} catch(error) {
    console.log(error)
}
}


useEffect(() => {
getUsersMessages()
getClickedUsersMessages()
},[usersMessages, clickedUserMessages])

const messages = [];

usersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.first_name
    formattedMessage['img'] = user?.url 
    formattedMessage['message'] = user?.messages
    formattedMessage['timestamp'] = user.timestamp
     messages.push(formattedMessage)
});

clickedUsersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedUser?.first_name
    formattedMessage['img'] = clickedUser?.url 
    formattedMessage['message'] = user?.messages
    formattedMessage['timestamp'] = user.timestamp
     messages.push(formattedMessage)
});

const descendingOrderMessages = messages.sort((a,b) => a.timestamp.localCompare(b.timestamp))


console.log('userMessages', usersMessages)
// console.log('formattedMessages', formattedMessage)

    return(
       <>
       <Chat />
       <ChatInput />


       </>
    )
}