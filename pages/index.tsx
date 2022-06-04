import { Avatar, Card, Center, Grid, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useStyles } from '../styles/index'
import styles from '../styles/Home.module.css'
import { ChatIcon } from '@heroicons/react/outline'
import Message from '../components/Message'
import { useContext, useEffect, useRef, useState } from 'react'
import { UsersContext } from '../context api/User'
import { MessageContext } from '../context api/Message'
import { useRouter } from 'next/router'
import { NextLink } from '@mantine/next'
import { InboxContext } from '../context api/Inbox'
import axios from 'axios'
import MessageSender from '../components/MessageSender'
import { io } from 'socket.io-client'
import { showNotification } from '@mantine/notifications'

const Home: NextPage = () => {
  const {classes} = useStyles()
  const [receiver, setReceiver] = useState("")
  const messagesEndRef = useRef(null)
  const [user , setUser] = useContext(UsersContext)
  const [message, setMessage] = useContext(MessageContext)
  const [inbox, setInbox] = useContext(InboxContext)
  const [isSender, setIsSender] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const socket = useRef()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const router = useRouter()


  useEffect(async() => {
    // Seting up this user
    socket.current = io("ws://localhost:3002");
    scrollToBottom()
    let LocalUser = localStorage.getItem("User")
    if(!LocalUser){
      router.push("/login")
    } else {
        LocalUser = JSON.parse(LocalUser)
        await setUser(LocalUser)
        axios.get("http://localhost:3001/users/").then(res =>{
          console.log(res.data);
          const Inboxes = res.data.filter(us => us.id !== user.id)
          setInbox(Inboxes)
          // inbox.map(x => console.log(x)) 

        }).then(() =>{

            console.log("emitting ", LocalUser.id);
            socket.current.emit("addUser", LocalUser.id);
        }).then(()=>{

          console.log(inbox)
          socket.current.on("getMessage", (data) => {
            console.log(data)
            console.log("[------------------------------------chatsss--------",chatOpened);
            
            if(chatOpened && data.senderId == message.Receiver){
              let newMsg = {
                Sender: !isSender,
                Receiver: isSender,
                Text: data.text
              }
              setMessage({
                _id: message._id,
                Sender: message.Sender,
                Receiver: message.Receiver,
                messages: [...message.messages, newMsg]
            })
      
            } else {
              console.log(inbox); 
              showNotification({
                  title: data.senderName,
                  message: data.text
                })
            }
          });
        }).catch(err => alert(err))
    }
  }, []);

  


  //getting all the messages
  function handleCard(id, name){
    console.log(user)
    setChatOpened(true)

    axios.get(`http://localhost:3001/users/${user.id}/message/${id}`).then(res=>{
        console.log(res)

        if(res.data[0]){
          //Some times my server sends a array data.
          console.log(res.data[0]);
          setMessage(res.data[0])
          setReceiver(name)
          if(res.data[0].messages.length !== 0){
            setEmpty(true)
          }

          if(res.data[0].Sender === user.id){
            console.log
            setIsSender(true)
          }

        } else if(res.data) {
          //Some times my server sends a raw data.
          console.log(res.data);
          setMessage(res.data)
          setReceiver(name)

          if(res.data.messages.length !== 0){
            setEmpty(true)
          }

          if(res.data.Sender === user.id){
            console.log
            setIsSender(true)
          }

        }
        scrollToBottom()
    }).catch(err => alert(err))
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>{user.name}</title>
        <meta name="description" content="Created by Adi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid columns={36} >
          <Grid.Col className={classes.sidebar}  span={2} >
            <Stack align="center">

              <Avatar src={"/images/avatar.png"} sx={{marginTop:"20px", marginBottom:"30px  "}} radius="xl" />

              <ThemeIcon radius="xl" size="xl" color="violet">
                <ChatIcon/>
              </ThemeIcon>
            </Stack>

          </Grid.Col>

          <Grid.Col sx={{background:"#1A202F"}}  span={27}>
            <Grid columns={27}>
              <Grid.Col span={7}>
                  <Stack className='chatBoxHolder' sx={{marginTop:"20px"}}>
                      {inbox && inbox.map((chat:any) =>{
                        if(chat.id !== user.id){
                        return(
                        <Card onClick={() => handleCard(`${chat.id}`, chat.name)}  className='CustomCard' key={chat.id} sx={{ }}>
                          <Group >
                          <Avatar color="cyan" radius="xl">{chat.name.slice(0, 2)}</Avatar>
                          <Text >{chat.name}</Text>
                          </Group>
                        </Card>
                      )
                    }
                    else{
                      return(<></>)
                    }
})}
                  </Stack>
              </Grid.Col>
              <Grid.Col  ref={messagesEndRef} sx={{position:"relative"}}  span={20}>
                {message && (<Group className='bar'>
                    <Avatar color="cyan" radius="xl">{receiver.slice(0, 2)}</Avatar>
                    <Text sx={{color:"white"}} >{receiver}</Text>
                </Group> )}
                <div className='messageBoxHolder'>
                  {empty ? message.messages.map(text =>(
                      <Message msg={text.Text} sender={user.name} receiver={receiver} send={isSender ? text.Sender : text.Receiver} />
                  )) : (<></>)}
                <div ref={messagesEndRef} />
              </div>
              {message && ( <MessageSender socket={socket.current} chatId={message._id} isSender={isSender} scrollToBottom={scrollToBottom} /> )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
            <Grid.Col span={7}>
              <Center sx={{display:"flex", flexDirection:"column", marginTop:"50px"}}>
                <Avatar sx={{width:"100px", height:"100px", borderRadius:"50px"}} color="cyan" radius="xl">{receiver.slice(0, 2)}</Avatar>
                <Text sx={{color:"white"}} weight="normal" size="xl" >{receiver}</Text>
              </Center>

            </Grid.Col>
        </Grid>
      </main>
    </div>
  )
}

export default Home
