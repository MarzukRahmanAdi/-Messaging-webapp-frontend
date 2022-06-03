import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { Group, ThemeIcon } from "@mantine/core"
import axios from "axios"
import { NextPage } from "next"
import { useContext, useState } from "react"
import { InboxContext } from "../context api/Inbox"



const  MessageSender:NextPage = () => {
    const [msg, setMsg] = useState()
    const [inbox, setInbox] = useContext(InboxContext)
    const handleSubmit = () =>{
        console.log(inbox)
        // axios.post("http://localhost:3001/users/PushMessage")
    }
  return (
    <>
    <form className="senderForm" onSubmit={(e) =>handleSubmit(e)}>
        <input type="text" value={msg} required placeholder="Type a message" onChange={(e) => {setMsg(e.target.value)}}  className="senderInputBox" />
        <ThemeIcon onClick={() =>handleSubmit()} className="senderIcon" radius={50} color="violet" sx={{padding: "5px"}} size="xl">
            <PaperAirplaneIcon />
        </ThemeIcon>
    </form>
    </>
  )
}

export default MessageSender