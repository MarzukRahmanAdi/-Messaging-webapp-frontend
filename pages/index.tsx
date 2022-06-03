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

const Home: NextPage = () => {
  const {classes} = useStyles()
  const receiver = "Jony"
  const messagesEndRef = useRef(null)
  const [user , setUser] = useContext(UsersContext)
  const [message, setMessage] = useContext(MessageContext)
  const [inbox, setInbox] = useContext(InboxContext)
  const [currentChat, setCurrentChat] = useState()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const router = useRouter()
  useEffect(() => {
    scrollToBottom()
    let LocalUser = localStorage.getItem("User")
    if(!LocalUser){
      router.push("/login")
    } else {
        LocalUser = JSON.parse(LocalUser)
        setUser(LocalUser)
        axios.get("http://localhost:3001/users/").then(res =>{
          const Inboxes = res.data.filter(us => us.id !== user.id)
          setInbox(Inboxes)
          inbox.map(x => console.log(x))

        }).catch(err => alert(err))

    }
  }, []);

  const chats:any = ["Adi", "hola", "Doing", "Daki"]


  //getting all the messages
  function handleCard(id){
    axios.get(`http://localhost:3001/users/${user.id}/message/${id}`).then(res=>{
        console.log(res)
        if(!res.data){
          setCurrentChat(id)
        }
    }).catch(err => alert(err))
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Chat</title>
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
                      {inbox.map((chat:any) =>(
                        <Card onClick={() => handleCard(`${chat.id}`)}  className='CustomCard' key={chat.id} sx={{ }}>
                          <Group >
                          <Avatar color="cyan" radius="xl">{chat.name.slice(0, 2)}</Avatar>
                          <Text >{chat.name}</Text>
                          </Group>
                        </Card>
                      ))}
                  </Stack>
              </Grid.Col>
              <Grid.Col  ref={messagesEndRef} sx={{position:"relative"}}  span={20}>
                <Group className='bar'>
                    <Avatar color="cyan" radius="xl">{receiver.slice(0, 2)}</Avatar>
                    <Text sx={{color:"white"}} >{receiver}</Text>
                </Group>
                <div className='messageBoxHolder'>
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <Message msg={"Helsddddddddddddddddddddddddddddddddddddddddddddddddlo"} send={true} />
                <Message msg={"hola"} send={false} />
                <div ref={messagesEndRef} />
              </div>
              <MessageSender/>
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
