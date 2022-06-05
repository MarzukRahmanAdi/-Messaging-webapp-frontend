import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { Group, ThemeIcon } from "@mantine/core"
import axios from "axios"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { InboxContext } from "../context api/Inbox"
import { MessageContext } from "../context api/Message"
import { UsersContext } from "../context api/User"
import handleMsg from '../functions/handleMsg'


const  MessageSender:NextPage = ({ socket, chatId, isSender, scrollToBottom}: AppProps) => {
    const [msg, setMsg] = useState()
    const [message, setMessage] = useContext(MessageContext)
    const [user, setUser] = useContext(UsersContext)

    const handleSubmit = () =>{
        if(!msg) return

        //add your backend url here ->
        axios.post("http://localhost:3001/users/PushMessage", {
            chatId : chatId,
            Sender: isSender,
            Receiver: !isSender,
            Text: msg
        }).then(async (res)=>{
            let newMsg = {
                Sender: isSender,
                Receiver: !isSender,
                Text: msg
            }
            setMsg("")
            // newMessage.messages.push()
  

            setMessage({
                _id: chatId,
                Sender: message.Sender,
                Receiver: message.Receiver,
                messages: [...message.messages, newMsg]
            })
            scrollToBottom()
            const receiver = isSender ? message.Receiver : message.Sender
            const result = await handleMsg(user.id, receiver , newMsg.Text, socket, user.name);
        }).catch(err =>{
            alert(err)
        })
    }

    const handleForm = (e) =>{
        e.preventDefault();
        handleSubmit()
    }

  return (
    <>
    <form className="senderForm" onSubmit={(e) =>handleForm(e)}>
        <input  type="text" value={msg} required placeholder="Type a message" onChange={(e) => {setMsg(e.target.value)}}  className="senderInputBox" />
        <ThemeIcon onClick={() =>handleSubmit()} className="senderIcon" radius={50} color="violet" sx={{padding: "5px"}} size="xl">
            <PaperAirplaneIcon />
        </ThemeIcon>
        <button style={{display:"none"}} type="submit">submit</button>
    </form>
    </>
  )
}

export default MessageSender