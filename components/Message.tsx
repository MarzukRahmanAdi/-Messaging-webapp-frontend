import { Avatar, Box, Group, Paper, Text } from "@mantine/core"
import { NextPage } from "next"
import { AppProps } from "next/app"



const Message:NextPage = ({msg, send} : AppProps) =>{
    const sender = "Adi"
    const receiver = "Jony"
    return(
        <div className="messages">
        {/* <Box className={send? "Visible" : "Invisible"}>
            {!send ? (
                <>
                <Group>
                    <Avatar className={send? "senderAvatar" : "receiverAvatar"} color="cyan" radius="xl">{send? sender.slice(0, 2) : receiver.slice(0,2) }</Avatar> 
                        <Paper className={`messageBox ${send? "senderText" : "receiverText"}`}>
                            <Text>{msg}</Text>
                        </Paper>
                </Group>
                </>
            ) : (
                <>
                </>
            )}

        </Box> */}
            <Group className={send? "senderBox" : "receiverBox"}>
                <Avatar className={send? "senderAvatar" : "receiverAvatar"} color="cyan" radius="xl">{send? sender.slice(0, 2) : receiver.slice(0,2) }</Avatar> 
                <Paper className={`messageBox ${send? "senderText" : "receiverText"}`}>
                    <Text>{msg}</Text>
                </Paper>
            </Group>
        </div>
    )
}
export default Message

