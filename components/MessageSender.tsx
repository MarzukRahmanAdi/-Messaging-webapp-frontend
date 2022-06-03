import { PaperAirplaneIcon } from "@heroicons/react/outline"
import { Group, ThemeIcon } from "@mantine/core"
import { NextPage } from "next"



const  MessageSender:NextPage = () => {
  return (
    <>
    <form className="senderForm">
        <input type="text" placeholder="Type a message"  className="senderInputBox" />
        <ThemeIcon className="senderIcon" radius={50} color="violet" sx={{padding: "5px"}} size="xl">
            <PaperAirplaneIcon />
        </ThemeIcon>
    </form>
    </>
  )
}

export default MessageSender