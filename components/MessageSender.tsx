import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { Group, ThemeIcon } from "@mantine/core"
import axios from "axios"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { MessageContext } from "../context api/Message"



const  MessageSender:NextPage = ({chatId, isSender, scrollToBottom}: AppProps) => {
    const [msg, setMsg] = useState()
    const [message, setMessage] = useContext(MessageContext)

    const handleSubmit = () =>{

        axios.post("http://localhost:3001/users/PushMessage", {
            chatId : chatId,
            Sender: isSender,
            Receiver: !isSender,
            Text: msg
        }).then(res=>{
            console.log(res.data);
            setMsg("")
            let newMsg = {
                Sender: isSender,
                Receiver: !isSender,
                Text: msg
            }
            // newMessage.messages.push()
            console.log(...message.messages);
            let newMessage = message;

            setMessage({
                _id: chatId,
                Sender: newMessage.Sender,
                Receiver: newMessage.Receiver,
                messages: [...message.messages, newMsg]
            })
            scrollToBottom()
            console.log(message)
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